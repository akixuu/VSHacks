const mongoose = require('mongoose')

const StudySessionSchema = new mongoose.Schema({ // bad implementation :)
    userId: {
        type: String,
        required: true
    },
    pointsAmassed: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('studytimes', StudySessionSchema);;