
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

function getMonth(date) {
    let eM = date.getMonth() +1
    if (eM < 10) {
        eM = '0' + eM
    }
    return eM
}

function getDate(date) {
    let eD = date.getDate()
    if (eD < 10) {
        eD = '0' + eD
    }
    return eD
}

export function convertTimestampToDate(timestamp) {
    return new Date(timestamp.seconds * 1000)
}

export function convertTimestampToReadableDateForPanning(timestamp) {
    let timestampConverted = timestamp.seconds * 1000
    timestampConverted = new Date(timestampConverted)

    const date =
        timestampConverted.getFullYear() +
        '-' +
        (timestampConverted.getMonth()+1) +
        '-' +
        timestampConverted.getDate() +
        ' ' +
        getHours(timestampConverted)+
        ':' +
        getMinutes(timestampConverted) 
        

    return date
}


export function convertTimestampToReadableDate(timestamp) {
    let timestampConverted = timestamp.seconds * 1000
    timestampConverted = new Date(timestampConverted)

    const date =
        getDate(timestampConverted) +
        '/' +
        getMonth(timestampConverted) +
        '/' +
        timestampConverted.getFullYear() +
        ' ' +
        getHours(timestampConverted)+
        ':' +
        getMinutes(timestampConverted) 

    return date
}

export function convertDateToIso(date) {
    return `${date.getFullYear()}-${(getMonth(date) )}-${getDate(date)}`
}

export function getHoursAndMinutes(date) {
    return `${getHours(date)}:${getMinutes(date)}`
}

export function convertStringToDate(date, hourly) {
    const newDate = new Date(date)
    const convertedDate = newDate.getFullYear() +
        '-' +
        (getMonth(newDate)) +
        '-' +
        getDate(newDate) +
        ' ' +
        hourly

    return new Date(convertedDate)
}