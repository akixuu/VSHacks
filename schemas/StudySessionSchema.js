const mongoose=require('mongoose')
const StudySessionSchema=new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    pointsAmassed: {
        type: Number,
        required: true
    }
})

module.exports=mongoose.model('StudySessionSchema', StudySessionSchema)