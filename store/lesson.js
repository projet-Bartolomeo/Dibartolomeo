import { readQuerySnapshot, generateRandomId } from '../services/firestoreHelper'
import { convertTimestampToDate, convertTimestampToReadableDate } from '../services/dateHelper'

export const state = () => ({
    teacherList: [],
    studentList: [],
    new: {},
    details: {},
    form: {},
})

export const mutations = {
    set(state, { lesson, stateName }) {
        state[stateName] = lesson
    },

    removeFromList(state, { lessonIdsToDelete, stateName }) {
        state[stateName] = state[stateName].reduce((newLessonList, currentLesson) => {
            if (!lessonIdsToDelete.includes(currentLesson.id)) newLessonList.push(currentLesson)
            return newLessonList
        }, [])
    },

    modifyInList(state, { lessonToModify, stateName }) {
        state[stateName] = state[stateName].map(lessonNotUpdated => {
            const lessonUpdated = lessonToModify.find(lessonUdpated => lessonUdpated.id === lessonNotUpdated.id)
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
            if (field === toRemove) {
                state[stateName][fieldName].splice(key, 1)
            }
        })
    },
}

export const actions = {
    async setStudentList({ commit }, StudentId) {
        try {
            const studentListSnapshot = await this.$fire.firestore.collection("lesson")
                .where("teacherIds", "array-contains", StudentId).get()
            let studentList = readQuerySnapshot(studentListSnapshot)
            studentList = studentList.map(lesson => {
                lesson.startDate = convertTimestampToReadableDate(lesson.startDate)
                lesson.endDate = convertTimestampToReadableDate(lesson.endDate)
                return lesson
            })
            commit('set', { stateName: 'studentList', lesson: studentList })
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la récupération de votre cours', type: 'error' }, { root: true })
        }
    },

    async setTeacherList({ commit, rootState }, { startDateFilter, endDateFilter }) {
        try {
            const teacherListRef = this.$fire.firestore.collection('lesson')
                .where('teacherId', '==', rootState.user.id)
                .where('isArchived', '==', false)

            if (startDateFilter && endDateFilter) {
                teacherListRef
                    .where('startDate', '>=', new Date(startDateFilter))
                    .where('startDate', '<=', new Date(endDateFilter))
            } else {
                teacherListRef
                    .where('startDate', '>=', (new Date()).getTime())
                    .where('startDate', '<=', (new Date()).getTime() + 7 * 24 * 60 * 60 * 1000)
            }
            const teacherListSnapshot = await teacherListRef.get()
            let teacherList = readQuerySnapshot(teacherListSnapshot)
            teacherList = teacherList.map(lesson => {
                lesson.startDate = convertTimestampToReadableDate(lesson.startDate)
                lesson.endDate = convertTimestampToReadableDate(lesson.endDate)
                return lesson
            })
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
            const startDate = convertTimestampToDate(lesson.data().startDate)
            const endDate = convertTimestampToDate(lesson.data().endDate)
            commit('set', { stateName: 'details', lesson: { ...lesson.data(), id: lesson.id, startDate, endDate } })
            dispatch('student/setFromLesson', { stateName: 'details' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la récupération de votre cours', type: 'error' }, { root: true })
        }
    },

    setNew({ commit, dispatch }) {
        dispatch('resetNewForm')
        commit('set', {
            stateName: 'form',
            lesson: { valid: false },
        })
        dispatch('student/setFromLesson', { stateName: 'new' }, { root: true })
    },

    async create({ rootState, commit, dispatch }, lessonDatas) {
        try {
            const newLesson = { ...lessonDatas, teacherId: rootState.user.id, isArchived: false }
            if (newLesson.recurrence === 'everyWeek') {
                const weekInYear = 52
                const dateList = [newLesson.startDate]
                const recurrenceId = generateRandomId()

                for (let i = 0; i < weekInYear; i++) {
                    dateList.push(new Date(dateList[i].getTime() + 7 * 24 * 60 * 60 * 1000))
                }
                await Promise.all([
                    ...dateList.map(async date => {
                        console.log('fsdf')
                        const lesson = { ...newLesson, startDate: date, endDate: date, recurrenceId }
                        return await this.$fire.firestore.collection('lesson').add(lesson)
                    })
                ])
            } else {
                await this.$fire.firestore.collection('lesson').add(newLesson)
            }
            commit('notification/create', { description: 'votre cours a bien été créé' }, { root: true })
            dispatch('setTeacherList', {})
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la création de votre cours', type: 'error' }, { root: true })
        }
    },

    async removeStudentFromLesson({ state, commit }, { student, stateName, notUpdateInDatabase }) {
        try {
            commit('removeInListField', { stateName, fieldName: 'teacherIds', toRemove: student.id })
            commit('student/addToList', { stateName: 'notInLesson', student }, { root: true })
            commit('student/removeFromList', { stateName: 'fromLesson', studentId: student.id }, { root: true })
            if (!notUpdateInDatabase) {
                await this.$fire.firestore.collection('lesson')
                    .doc(state.details.id)
                    .update({ teacherIds: state.details.teacherIds })
            }
            commit('notification/create', { description: 'élève supprimé du cours' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la suppression d\'un élève', type: 'error' }, { root: true })
        }
    },

    async addStudentInLesson({ state, commit }, { student, stateName, notUpdateInDatabase }) {
        try {
            commit('addToListField', { stateName, fieldName: 'teacherIds', toAdd: student.id })
            commit('student/addToList', { stateName: 'fromLesson', student }, { root: true })
            commit('student/removeFromList', { stateName: 'notInLesson', studentId: student.id }, { root: true })
            if (!notUpdateInDatabase) {
                await this.$fire.firestore.collection('lesson')
                    .doc(state.details.id)
                    .update({ teacherIds: state.details.teacherIds })
            }
            commit('notification/create', { description: 'élève ajouté au cours' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'problème lors de l\'ajout d\'un élève', type: 'error' }, { root: true })
        }
    },

    async archive({ commit }, { lesson, startDate, endDate, all }) {
        const lessonRef = this.$fire.firestore.collection('lesson')
        let notification = { type: 'success', description: 'les cours ont bien été archivés' }

        try {
            if (all) {
                const lessonsSnapshot = await lessonRef
                    .where('recurrenceId', '==', lesson.recurrenceId)
                    .where('startDate', '>=', new Date())
                    .get()
                const lessons = readQuerySnapshot(lessonsSnapshot)
                commit('removeFromList', { stateName: 'teacherList', lessonIdsToDelete: lessons.map(lesson => lesson.id) })
                await Promise.all([
                    ...lessons.map(async lesson => await lessonRef.doc(lesson.id).update({ isArchived: true }))
                ])
            } else if (startDate && endDate) {
                const lessonsSnapshot = await lessonRef
                    .where('recurrenceId', '==', lesson.recurrenceId)
                    .where('startDate', '>=', startDate)
                    .where('startDate', '<=', endDate)
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

    async modify({ commit }, { lesson, payload, startDate, endDate, all }) {
        const lessonRef = this.$fire.firestore.collection('lesson')
        let notification = { type: 'success', description: 'le cours a bien été mis à jour' }
        let lessons = []

        try {
            if (all) {
                const lessonsSnapshot = await lessonRef
                    .where('recurrenceId', '==', lesson.recurrenceId)
                    .where('startDate', '>=', new Date())
                    .get()
                lessons = readQuerySnapshot(lessonsSnapshot)
                await Promise.all([
                    ...lessons.map(async lesson => await lessonRef.doc(lesson.id).update(payload))
                ])
            } else if (startDate && endDate) {
                const lessonsSnapshot = await lessonRef
                    .where('recurrenceId', '==', lesson.recurrenceId)
                    .where('startDate', '>=', startDate)
                    .where('startDate', '<=', endDate)
                    .get()
                lessons = readQuerySnapshot(lessonsSnapshot)
                await Promise.all([
                    ...lessons.map(async lesson => await lessonRef.doc(lesson.id).update(payload))
                ])
            } else {
                await lessonRef.doc(lesson.id).update(payload)
                lessons = [lesson]
            }
            commit('modifyInList', { stateName: 'teacherList', lessonToModify: lessons })
            commit('set', { stateName: 'form', lesson: { valid: true } })
        } catch (error) {
            notification = { type: 'error', description: 'problème lors de la mise à jour' }
        }
        commit('notification/create', notification, { root: true })
    },

    resetNewForm({ commit }) {
        commit('set', {
            stateName: 'new',
            lesson: {
                startDate: new Date(),
                endDate: new Date(),
                recurrence: 'everyWeek',
                ageRange: 'adult',
                teacherIds: []
            },
        })
    }
}
