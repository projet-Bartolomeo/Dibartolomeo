
function getMinutes(date) {
    let em = date.getMinutes()
    if (em < 10) em = '0' + em
    return em
}

function getHours(date) {
    let eh = date.getHours()
    if (eh < 10) eh = '0' + eh
    return eh
}

function getDay(date) {
    let day = date.getDate()
    if (day < 10) day = `0${day}`
    return day
}

function getMonth(date) {
    let month = date.getMonth() + 1
    if (month < 10) month = `0${month}`
    return month
}

export function convertTimestampToDate(timestamp) {
    return new Date(timestamp.seconds * 1000)
}

export function convertTimestampToReadableDate(timestamp) {
    let timestampConverted = timestamp.seconds * 1000
    timestampConverted = new Date(timestampConverted)

    const year = timestampConverted.getFullYear()
    const month = getMonth(timestampConverted)
    const day = getDay(timestampConverted)
    const minutes = getMinutes(timestampConverted)
    const hours = getHours(timestampConverted)

    return `${year}-${month}-${day} ${minutes}:${hours}`
}

export function convertDateToIso(date) {
    return `${date.getFullYear()}-${getMonth(date)}-${getDay(date)}`
}

export function getHoursAndMinutes(date) {
    return `${getHours(date)}:${getMinutes(date)}`
}

export function convertStringToDate(date, hourly) {
    const newDate = new Date(date)

    const month = getMonth(newDate)
    const day = getDay(newDate)

    const convertedDate = `${newDate.getFullYear()}-${month}-${day} ${hourly}`

    return new Date(convertedDate)
}