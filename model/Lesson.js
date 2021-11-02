const mongoose = require('mongoose')
const schema   = mongoose.Schema

// https://mongoosejs.com/docs/schematypes.html
const Lesson = new schema({
    studentliste : { type:Array, required:'un nom est obligatoire:)' },
    maximumStudents : { type:Number, required:'un nom est obligatoire:)' },
    recurrence: { type:String },
   recurrenceid: { type:String },
    ageRange:{ type:String },
    price:{ type: Number, default: Date.now },
    descritpion:{ type: String, default: false },
    teacherNote:{ type: String, default: false },
    startDate:{ type: Date, default: false },
    EndDate:{type:Date},
})

module.exports = Utilisateur =mongoose.model('utilisateur', UtilisateurSchema)
module.exports = Utilisateur = mongoose.model('utilisateur', UtilisateurSchema)
