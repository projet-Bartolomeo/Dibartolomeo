const mongoose = require('mongoose')
const schema   = mongoose.Schema

const User = new schema({
    Firstname : { type:String },
    LastName : { type:String },
    email: { type:String },
   type: { type:String },
    banned:{ type:Boolean ,default:false },
})
module.exports = user =mongoose.model('utilisateur', User)