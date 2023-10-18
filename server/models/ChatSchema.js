const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    fromMail : {
        type : String
    },
    toMail : {
        type : String
    },
    message : {
        type : String
    },
    time : {
        type: Date,
        default: Date.now(),
    }
})

const Chat = mongoose.model("chats",ChatSchema);
module.exports = Chat;