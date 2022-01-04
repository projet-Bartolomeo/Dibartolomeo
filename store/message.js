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

            const content = `<p>Dibartoloméo<p><a>${contentMessage}</a></h3><br /> <img class="fit-picture"
            src="https://trello.com/1/cards/6160076387267344d2d71b77/attachments/61806466e5b595625772b640/download/Capture_d%E2%80%99%C3%A9cran_2021-11-01_%C3%A0_23.03.58.png"
            alt="https://trello.com/1/cards/6160076387267344d2d71b77/attachments/61806466e5b595625772b640/download/Capture_d%E2%80%99%C3%A9cran_2021-11-01_%C3%A0_23.03.58.png">`

            await this.$axios.post('https://mailer-dibartolomeo.herokuapp.com/email',
                {
                    recipients: recipientsInformations,
                    subject,
                    content,
                })

            commit('notification/create', { description }, { root: true })
        } catch (error) {
            console.log(error)
            commit('notification/create', { description: 'problème lors de l\'envoi du message', type: 'error' }, { root: true })
        }
    },
}
