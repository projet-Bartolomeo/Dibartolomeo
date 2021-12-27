export function convertTimestampToDate(date) {
    const timestamp = date.seconds * 1000

    let convertedDate = new Date(timestamp)

    let eh = convertedDate.getHours()
    if (eh < 10) {
        eh = '0' + eh
    }
    let em = convertedDate.getMinutes()
    if (em < 10) {
        em = '0' + em
    }

    convertedDate =
        convertedDate.getFullYear() +
        '-' +
        (convertedDate.getMonth() + 1) +
        '-' +
        convertedDate.getDate() +
        ' ' +
        eh +
        ':' +
        em

    return convertedDate
}
