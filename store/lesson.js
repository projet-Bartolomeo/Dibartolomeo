import {
  readQuerySnapshot,
  generateRandomId,
} from '../services/firestoreHelper'
import {
  convertTimestampToDate,
  convertDateToIso,
} from '../services/dateHelper'

export const state = () => ({
  teacherList: [],
  studentList: [],
  new: {},
  details: {},
  form: {},
  filter: {
    search: '',
    startDate: convertDateToIso(new Date()),
    endDate: convertDateToIso(
      new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
    ),
  },
})

export const mutations = {
  set(state, { lesson, stateName }) {
    state[stateName] = lesson
  },

  removeFromList(state, { lessonIdsToDelete, stateName }) {
    state[stateName] = state[stateName].reduce(
      (newLessonList, currentLesson) => {
        if (!lessonIdsToDelete.includes(currentLesson.id))
          newLessonList.push(currentLesson)
        return newLessonList
      },
      []
    )
  },

  modifyInList(state, { lessonToModify, stateName }) {
    state[stateName] = state[stateName].map((lessonNotUpdated) => {
      const lessonUpdated = lessonToModify.find(
        (lessonUdpated) => lessonUdpated.id === lessonNotUpdated.id
      )
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
  async setStudentList({ commit }, { studentId }) {
    try {
      let studentListRef = this.$fire.firestore
        .collection('lesson')
        .where('isArchived', '==', false)

      if (studentId) {
        studentListRef = studentListRef.where(
          'studentIds',
          'array-contains',
          studentId
        )
      }
      const studentListSnapshot = await studentListRef.get()

      const studentList = readQuerySnapshot(studentListSnapshot)

      commit('set', { stateName: 'studentList', lesson: studentList })
    } catch (error) {
      commit(
        'notification/create',
        {
          description: 'problème lors de la récupération de vos cours',
          type: 'error',
        },
        { root: true }
      )
    }
  },

  async setTeacherList({ commit, rootState }) {
    try {
      const teacherListRef = this.$fire.firestore
        .collection('lesson')
        .where('teacherId', '==', rootState.user.connected.id)
        .where('isArchived', '==', false)

      const teacherListSnapshot = await teacherListRef.get()
      const teacherList = readQuerySnapshot(teacherListSnapshot)

      commit('set', { stateName: 'teacherList', lesson: teacherList })
    } catch (error) {
      commit(
        'notification/create',
        {
          description: 'problème lors de la récupération de votre cours',
          type: 'error',
        },
        { root: true }
      )
    }
  },

  async setDetails({ commit, dispatch }, { lessonId }) {
    try {
      const lesson = await this.$fire.firestore
        .collection('lesson')
        .doc(lessonId)
        .get()
      const startDate = convertTimestampToDate(lesson.data().startDate)
      const endDate = convertTimestampToDate(lesson.data().endDate)
      commit('set', {
        stateName: 'details',
        lesson: { ...lesson.data(), id: lesson.id, startDate, endDate },
      })
      dispatch(
        'student/setFromLesson',
        { stateName: 'details' },
        { root: true }
      )
    } catch (error) {
      commit(
        'notification/create',
        {
          description: 'problème lors de la récupération de votre cours',
          type: 'error',
        },
        { root: true }
      )
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
      const newLesson = {
        ...lessonDatas,
        teacherId: rootState.user.connected.id,
        isArchived: false,
      }
      if (newLesson.recurrence === 'everyWeek') {
        const weekInYear = 52
        const { startDate, endDate } = newLesson
        const dateList = [{ startDate, endDate }]
        const recurrenceId = generateRandomId()

        for (let i = 0; i < weekInYear; i++) {
          dateList.push({
            startDate: new Date(
              dateList[i].startDate.getTime() + 7 * 24 * 60 * 60 * 1000
            ),
            endDate: new Date(
              dateList[i].endDate.getTime() + 7 * 24 * 60 * 60 * 1000
            ),
          })
        }
        await Promise.all([
          ...dateList.map(async (dates) => {
            const lesson = {
              ...newLesson,
              startDate: dates.startDate,
              endDate: dates.endDate,
              recurrenceId,
            }
            return await this.$fire.firestore.collection('lesson').add(lesson)
          }),
        ])
      } else {
        await this.$fire.firestore.collection('lesson').add(newLesson)
      }
      commit(
        'notification/create',
        { description: 'votre cours a bien été créé' },
        { root: true }
      )
      dispatch('setTeacherList', {})
    } catch (error) {
      commit(
        'notification/create',
        {
          description: 'problème lors de la création de votre cours',
          type: 'error',
        },
        { root: true }
      )
    }
  },

  addStudentInLesson({ commit }, { student }) {
    commit(
      'student/addToList',
      { stateName: 'fromLesson', student },
      { root: true }
    )
    commit(
      'student/removeFromList',
      { stateName: 'notInLesson', studentId: student.id },
      { root: true }
    )
  },

  removeStudentInLesson({ commit }, { student }) {
    commit(
      'student/addToList',
      { stateName: 'notInLesson', student },
      { root: true }
    )
    commit(
      'student/removeFromList',
      { stateName: 'fromLesson', studentId: student.id },
      { root: true }
    )
  },

  async archive({ commit }, { lesson, startDate, endDate, all }) {
    const lessonRef = this.$fire.firestore.collection('lesson')
    let notification = {
      type: 'success',
      description: 'les cours ont bien été archivés',
    }

    try {
      if (all) {
        const lessonsSnapshot = await lessonRef
          .where('recurrenceId', '==', lesson.recurrenceId)
          .where('startDate', '>=', new Date())
          .get()
        const lessons = readQuerySnapshot(lessonsSnapshot)
        commit('removeFromList', {
          stateName: 'teacherList',
          lessonIdsToDelete: lessons.map((lesson) => lesson.id),
        })
        await Promise.all([
          ...lessons.map(
            async (lesson) =>
              await lessonRef.doc(lesson.id).update({ isArchived: true })
          ),
        ])
      } else if (startDate && endDate) {
        const lessonsSnapshot = await lessonRef
          .where('recurrenceId', '==', lesson.recurrenceId)
          .where('startDate', '>=', startDate)
          .where('startDate', '<=', endDate)
          .get()
        const lessons = readQuerySnapshot(lessonsSnapshot)
        commit('removeFromList', {
          stateName: 'teacherList',
          lessonIdsToDelete: lessons.map((lesson) => lesson.id),
        })
        await Promise.all([
          ...lessons.map(
            async (lesson) =>
              await lessonRef.doc(lesson.id).update({ isArchived: true })
          ),
        ])
      } else {
        await lessonRef.doc(lesson.id).update({ isArchived: true })
        commit('removeFromList', {
          stateName: 'teacherList',
          lessonIdsToDelete: [lesson.id],
        })
        notification = {
          type: 'success',
          description: 'le cours a bien été archivé',
        }
      }
    } catch (error) {
      notification = {
        type: 'error',
        description: "problème lors de l'achivage",
      }
    }
    commit('notification/create', notification, { root: true })
  },

  async modify(
    { state, commit },
    { lesson, startDate, endDate, all, newData, description }
  ) {
    const lessonRef = this.$fire.firestore.collection('lesson')
    let notification = { type: 'success', description }
    let lessons = []
    const payload = newData ?? state.form.payload
    const oldValues = state.form.oldValues

    try {
      let lessonsSnapshot
      if (all) {
        lessonsSnapshot = await lessonRef
          .where('recurrenceId', '==', lesson.recurrenceId)
          .where('startDate', '>=', new Date())
          .get()
      } else if (startDate && endDate) {
        lessonsSnapshot = await lessonRef
          .where('recurrenceId', '==', lesson.recurrenceId)
          .where('startDate', '>=', startDate)
          .where('startDate', '<=', endDate)
          .get()
      }

      const hasOneToUpdate = !all && !startDate && !endDate

      if (hasOneToUpdate) {
        lessons = [{ ...lesson, ...payload }]
      } else {
        let startDateDifference = 0
        let endDateDifference = 0
        if (payload.startDate !== undefined)
          startDateDifference =
            payload.startDate.getTime() - oldValues.startDate.getTime()
        if (payload.endDate !== undefined)
          endDateDifference =
            payload.endDate.getTime() - oldValues.endDate.getTime()

        lessons = readQuerySnapshot(lessonsSnapshot).map((lesson) => {
          const startDate = new Date(
            convertTimestampToDate(lesson.startDate).getTime() +
            startDateDifference
          )
          const endDate = new Date(
            convertTimestampToDate(lesson.endDate).getTime() + endDateDifference
          )

          return { ...lesson, ...payload, startDate, endDate }
        })
      }

      commit('modifyInList', {
        stateName: 'studentList',
        lessonToModify: lessons,
      })
      commit('modifyInList', {
        stateName: 'teacherList',
        lessonToModify: lessons,
      })
      commit('set', { stateName: 'details', lesson: { ...lesson, ...payload } })

      await Promise.all(
        lessons.map(
          async (lesson) => await lessonRef.doc(lesson.id).update({ ...lesson })
        )
      )
      commit('set', { stateName: 'form', lesson: { valid: true } })
    } catch (error) {
      notification = {
        type: 'error',
        description: 'problème lors de la mise à jour',
      }
      commit('notification/create', notification, { root: true })
    }

    if (description) commit('notification/create', notification, { root: true })
  },

  resetNewForm({ commit }) {
    commit('set', {
      stateName: 'new',
      lesson: {
        startDate: new Date(),
        endDate: new Date(),
        recurrence: 'everyWeek',
        ageRange: 'adult',
        studentIds: [],
      },
    })
  },
}

export const getters = {
  studentListFiltered: (state) => {
    const { studentList, filter } = state

    function lessonSearchFilter() {
      return studentList.filter((lesson) =>
        lesson.title
          .toLowerCase()
          .includes(filter.search.toLowerCase())
      )
    }

    function lessonDateFilter(studentListFiltered) {
      return studentListFiltered.filter((lesson) => {
        return (
          convertTimestampToDate(lesson.startDate) >=
          new Date(filter.startDate) &&
          convertTimestampToDate(lesson.endDate) <=
          new Date(filter.endDate)
        )
      })
    }

    let studentListFiltered =
      filter.search === '' ? studentList : lessonSearchFilter()
    studentListFiltered = lessonDateFilter(studentListFiltered)
    return studentListFiltered.sort(
      (previousLesson, nextLesson) =>
        new Date(convertTimestampToDate(previousLesson.startDate)) -
        new Date(convertTimestampToDate(nextLesson.startDate))
    )
  },
}
