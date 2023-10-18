const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    Name : {
        type :String,
        require : true
    },
    Email :{
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    currentYear : {
        type : Number,
        require : true
    }
})
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;