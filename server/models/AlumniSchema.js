const mongoose = require('mongoose');

const AlumniSchema = mongoose.Schema({
    Name : {
        type : String,
        require : true
    },
    Email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    file :{
        type:String,
        default :''
    },
    Graduation_year : {
        type : Number,
        require : true
    },
    expertise : {
        type : String,
        require : true
    },
    current_role : {
        type : String,
        require : true
    },
    LinkedIn : {
        type : String,
        require : true
    },
    Achievements : {
        type : String,
        require : true
    },
    CreationDate: {
        type: Date,
        default: Date.now(),
    },
})

const Alumni = mongoose.model("Alumni's",AlumniSchema);
module.exports = Alumni