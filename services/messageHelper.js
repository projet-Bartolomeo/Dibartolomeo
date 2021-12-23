export function createMessageDescription(type, recipients) {
    let description = ''
    if (type === 'student') {
        const recipientsName = recipients.map(
            (recipient) => `${recipient.firstname} ${recipient.lastname}`
        )
        switch (recipients.length) {
            case 1:
                description = `message envoyé à ${recipientsName[0]}`
                break
            case 2:
                description = `message envoyé à ${recipientsName[0]} et ${recipientsName[1]}`
                break
            case 3:
                description = `message envoyé à ${recipientsName[0]}, ${recipientsName[1]} et ${recipientsName[2]}`
                break
            default:
                description = `message envoyé à ${recipients.length} élèves`
        }
    } else {
        switch (recipients.length) {
            case 1:
                description = `message envoyé aux élèves du cours '${recipients[0].title}'`
                break
            case 2:
                description = `message envoyé aux élèves des cours '${recipients[0].title}' et '${recipients[1].title}'`
                break
            case 3:
                description = `message envoyé aux élèves des cours '${recipients[0].title}', '${recipients[0].title}' et '${recipients[2].title}'`
                break
            default:
                description = `message envoyé aux élèves des ${recipients.length} cours`
        }
    }
    return description
}
