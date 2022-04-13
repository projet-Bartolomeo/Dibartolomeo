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

function getDateDetails(date) {
    const year = date.getFullYear()
    const month = getMonth(date)
    const day = getDay(date)
    const minutes = getMinutes(date)
    const hours = getHours(date)

    return { year, month, day, minutes, hours }
}

export function convertTimestampToDate(timestamp) {
    return new Date(timestamp.seconds * 1000)
}

export function convertTimestampToReadableDate(timestamp) {
    const timestampConverted = convertTimestampToDate(timestamp)

    const { year, month, day, minutes, hours } = getDateDetails(timestampConverted)

    return `${day}/${month}/${year} ${hours}:${minutes}`
}

export function convertDateToPlanningDate(date) {
    const dateConverted = date.seconds === undefined ? date : convertTimestampToDate(date)
    const { year, month, day, minutes, hours } = getDateDetails(dateConverted)

    return `${year}-${month}-${day} ${hours}:${minutes}`
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

export function convertReadableToDate(date) {
    const [ day, month, year, hours, minutes ] = date.split(/[^0-9]/)
    const dateConverted = `${year}-${month}-${day} ${hours}:${minutes}`
    return new Date(dateConverted)
}
