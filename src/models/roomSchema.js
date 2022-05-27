const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({


    name: {
        type : String,
        required : true
    },
    players: {
        type: Number,
        required: true

    },
    playerOne: {
        type: String,
        required: false,

    },
    playerTwo: {
        type: String,
        required: false,

    },

}, { autoCreate: true })

module.exports = mongoose.model('rooms', RoomSchema);