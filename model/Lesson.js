const mongoose = require('mongoose')
const schema   = mongoose.Schema


const Lesson = new schema({
    studentliste : { type:Array },
    maximumStudents : { type:Number },
    recurrence: { type:String },
   recurrenceid: { type:String },
    ageRange:{ type:String },
    price:{ type: Number },
    descritpion:{ type: String },
    teacherNote:{ type: String },
    startDate:{ type: Date, default: false },
    EndDate:{type:Date},
})
module.exports = lesson =mongoose.model('Lesson', Lesson)

