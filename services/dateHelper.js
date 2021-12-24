export function convertTimestampToDate(date) {
    const timestamp = date * 1000

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
        convertedDate.getDate() +
        '/' +
        (convertedDate.getMonth() + 1) +
        '/' +
        convertedDate.getFullYear() +
        ' ' +
        eh +
        ':' +
        em

    return convertedDate
}
