import { readQuerySnapshot, generateRandomId } from '../services/firestoreHelper'

export const state = () => ({
    teacherList: [],
    studentList: [],
    new: {},
    details: {},
})

export const mutations = {
    set(state, { lesson, stateName }) {
        state[stateName] = lesson
    },

    removeFromList(state, { lessonIdsToDelete, stateName }) {
        state[stateName] = state[stateName].reduce((newLessonList, currentLesson) => {
            if (!lessonIdsToDelete.include(currentLesson.id)) newLessonList.push(currentLesson)
            return newLessonList
        }, [])
    },

    modifyInList(state, { lessonListToUpdate, stateName }) {
        state[stateName] = state[stateName].map(lessonNotUpdated => {
            const lessonUpdated = lessonListToUpdate.find(lessonUdpated => lessonUdpated.id === lessonNotUpdated.id)
            if (lessonUpdated === undefined) return lessonNotUpdated
            return lessonUpdated
        })
    },

    modify(state, { payload, stateName }) {
        state[stateName] = { ...state[stateName], ...payload }
    },

    addToListField(state, { stateName, fieldName, toAdd }) {
        state[stateName][fieldName].push(toAdd)
    },

    removeInListField(state, { stateName, fieldName, toRemove }) {
        state[stateName][fieldName].forEach((field, key) => {
            if (field === toRemove) state[stateName][fieldName].splice(key, 1)
        })
    },
}

export const actions = {
    async setTeacherList({ state, commit }, { startDateFilter, endDateFilter }) {
        try {
            const teacherListRef = this.$fire.firestore.collection('lesson')
                .where('profesorId', '==', state.user.id)
                .where('isArchived', '==', false)

            if (startDateFilter !== undefined && endDateFilter !== undefined) {
                teacherListRef
                    .where('startDate', '>=', new Date(startDateFilter))
                    .where('startDate', '<=', new Date(endDateFilter))
            } else {
                teacherListRef
                    .where('startDate', '>=', new Date())
                    .where('startDate', '<=', new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000))
            }

            const teacherListSnapshot = await teacherListRef.get()
            const teacherList = readQuerySnapshot(teacherListSnapshot)
            commit('set', { stateName: 'teacherList', lesson: teacherList })
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la récupération de votre cours', type: 'error' }, { root: true })
        }
    },

    async setDetails({ commit, dispatch }, { lessonId }) {
        try {
            const lesson = await this.$fire.firestore.collection('lesson')
                .doc(lessonId)
                .get()
            commit('set', { stateName: 'details', lesson })
            dispatch('student/setFromLesson', { root: true })
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la récupération de votre cours', type: 'error' }, { root: true })
        }
    },

    async create({ commit, dispatch }, newLesson) {
        try {
            commit('set', { stateName: 'newLesson', lesson: {} })
            if (newLesson === 'everyWeek') {
                const weekInYear = 52
                const dateList = [newLesson.startDate]
                const recurrenceId = generateRandomId()

                for (let i = 0; i < weekInYear; i++) {
                    dateList.push(new Date(dateList[i].getTime() + 7 * 24 * 60 * 60 * 1000))
                }

                if (newLesson.recurrence === 'everyWeek') await Promise.all([
                    ...dateList.map(async date => {
                        const lesson = { ...newLesson, startDate: date, endDate: date, recurrenceId }
                        return await this.$fire.firestore.collection('lesson').add(lesson)
                    })
                ])
            } else {
                await this.$fire.firestore.collection('lesson').add(newLesson)
            }
            commit('notification/create', { description: 'votre cours a bien été créé' }, { root: true })
            await dispatch('setTeacherList')
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la création de votre cours', type: 'error' }, { root: true })
        }
    },

    async archive({ commit }, { lesson, startDate, endDate, all }) {
        const lessonRef = this.$fire.firestore.collection('lesson')
        let notification = { type: 'success', description: 'les cours ont bien été archivés' }
        try {
            if (all) {
                const lessonsSnapshot = await lessonRef
                    .where('startDate', '>=', new Date())
                    .where('recurrenceId', '==', lesson.recurrenceId)
                    .get()
                const lessons = readQuerySnapshot(lessonsSnapshot)
                commit('removeFromList', { stateName: 'teacherList', lessonIdsToDelete: lessons.map(lesson => lesson.id) })
                await Promise.all([
                    ...lessons.map(async lesson => await lessonRef.doc(lesson.id).update({ isArchived: true }))
                ])
            } else if (startDate !== null && endDate !== null) {
                const lessonsSnapshot = await lessonRef
                    .where('startDate', '>=', new Date(startDate))
                    .where('startDate', '<=', new Date(endDate))
                    .get()
                const lessons = readQuerySnapshot(lessonsSnapshot)
                commit('removeFromList', { stateName: 'teacherList', lessonIdsToDelete: lessons.map(lesson => lesson.id) })
                await Promise.all([
                    ...lessons.map(async lesson => await lessonRef.doc(lesson.id).update({ isArchived: true }))
                ])
            } else {
                await lessonRef.doc(lesson.id).update({ isArchived: true })
                commit('removeFromList', { stateName: 'teacherList', lessonIdsToDelete: [lesson.id] })
                notification = { type: 'success', description: 'le cours a bien été archivé' }
            }
        } catch (error) {
            notification = { type: 'error', description: 'problème lors de l\'achivage' }
        }
        commit('notification/create', notification, { root: true })
    },

    async removeStudentFromLesson({ state, commit }, { student }) {
        try {
            commit('removeInListField', { stateName: 'details', fieldName: 'studentIdsList', toRemove: student.id })
            commit('student/addToList', { stateName: 'notInLesson', student }, { root: true })
            commit('student/removeFromList', { stateName: 'fromLesson', studentId: student.id }, { root: true })
            await this.$fire.firestore.collection('lesson')
                .doc(state.lesson.details.id)
                .update({ studentIdsList: state.lesson.details.studentIdsList })
            commit('notification/create', { description: 'élève supprimé du cours' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la récupération de l\'élève', type: 'error' }, { root: true })
        }
    },

    async addStudentInLesson({ state, commit }, { student }) {
        try {
            commit('addToListField', { stateName: 'details', fieldName: 'studentIdsList', toAdd: student.id })
            commit('student/addToList', { stateName: 'fromLesson', student }, { root: true })
            commit('student/removeFromList', { stateName: 'notInLesson', studentId: student.id }, { root: true })
            await this.$fire.firestore.collection('lesson')
                .doc(state.lesson.details.id)
                .update({ studentIdsList: state.lesson.details.studentIdsList })
            commit('notification/create', { description: 'élève supprimé du cours' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la récupération de l\'élève', type: 'error' }, { root: true })
        }
    },

    async modify({ commit }, { lesson, payload, startDate, endDate, all }) {
        const profesorReference = this.$fire.firestore.collection('lesson')
        let notification = { type: 'success', description: 'vos cours ont bien été mis à jour' }

        try {
            if (all) {
                await profesorReference
                    .where('recurrenceId', '==', lesson.recurrenceId)
                    .update(payload)
            } else if (startDate !== null && endDate !== null) {
                await profesorReference
                    .where('recurrenceId', '==', lesson.recurrenceId)
                    .where('startDate', '>=', startDate.getTime())
                    .where('endDate', '<=', endDate.getTime())
                    .update(payload)
            } else if (lesson.recurrence !== 'unique') {
                await profesorReference.doc(lesson.id).update({ ...payload, recurrence: 'unique', recurrenceId: null })
                notification = { type: 'success', description: 'votre cours a bien été mis à jour' }
            } else {
                await profesorReference.doc(lesson.id).update(payload)
                notification = { type: 'success', description: 'votre cours a bien été mis à jour' }
            }
        } catch (error) {
            notification = { type: 'error', description: 'problème lors de la mise à jour' }
        }
        commit('notification/create', notification, { root: true })
    },
}
