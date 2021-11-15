const mongoose = require('mongoose')
const schema   = mongoose.Schema


const Message = new schema({
    Content : { type:String,require :'doit avoir un contenu ' },
    senderId : { type:String },
    recipientsid: { type:String },
   lessonid: { type:String },
    
})
module.exports = message =mongoose.model('Meesage', Message)


