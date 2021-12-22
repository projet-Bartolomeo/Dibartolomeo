export function converstiondate(date) {
    const timestamp = date * 1000
  

    const dateconversation = new Date(timestamp)
    

    let eh = dateconversation.getHours()
    if (eh < 10) {
      eh = '0' + eh
    }
    let em = dateconversation.getMinutes()
    if (em < 10) {
      em = '0' + em
    }

    

    dateconvertir =
      dateconversation.getDate() +
      '/' +
      (dateconversation.getMonth() + 1) +
      '/' +
      dateconversation.getFullYear() +
      ' ' +
      eh +
      ':' +
      em

   
        return dateconvertir
    
}
