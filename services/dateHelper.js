
function getMinutes(date) {
    let em = date.getMinutes()
    if (em < 10) {
        em = '0' + em
    }
    return em
}

function getHours(date) {
    let eh = date.getHours()
    if (eh < 10) {
        eh = '0' + eh
    }
    return eh
}

export function convertTimestampToDate(timestamp) {
    return new Date(timestamp.seconds * 1000)
}

export function convertTimestampToReadableDate(timestamp) {
    let timestampConverted = timestamp.seconds * 1000
    timestampConverted = new Date(timestampConverted)

    const date =
        timestampConverted.getFullYear() +
        '-' +
        (timestampConverted.getMonth() + 1) +
        '-' +
        timestampConverted.getDate() +
        ' ' +
        getMinutes(timestampConverted) +
        ':' +
        getHours(timestampConverted)

    return date
}

export function convertDateToIso(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`
}

export function getHoursAndMinutes(date) {
    return `${getHours(date)}:${getMinutes(date)}`
}

export function convertStringToDate(date, hourly) {
    const newDate = new Date(date)
    const convertedDate = newDate.getFullYear() +
        '-' +
        (newDate.getMonth() + 1) +
        '-' +
        newDate.getDate() +
        ' ' +
        hourly

    return new Date(convertedDate)
}