export const actions = {
    async send({ commit }, { type, recipients, description, contentMessage, subjectType }) {
        try {
            let recipientsInformations = []
            if (type === 'lesson') {
                await Promise.all([
                    ...recipients.map(async lesson => {
                        await Promise.all([
                            ...lesson.studentIds.map(async id => {
                                const user = await this.$fire.firestore.collection('user').doc(id).get()
                                recipientsInformations.push({ ...user.data(), name: user.data().firstName })
                            })
                        ])
                    })
                ])
            } else {
                recipientsInformations = recipients.map(recipient => { return { ...recipient, name: recipient.firstName } })
            }

            const subject = subjectType === 'inscription'
                ? 'Dibartoloméo - création du compte'
                : 'Dibartoloméo - vous avez recu un message de votre professeur'

            const content = `<a>${contentMessage}</a>`

            await this.$axios.post('https://mailer-dibartolomeo.herokuapp.com/email',
                {
                    recipients: recipientsInformations,
                    subject,
                    content,
                })

            commit('notification/create', { description }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'problème lors de l\'envoi du message', type: 'error' }, { root: true })
        }
    },
}
