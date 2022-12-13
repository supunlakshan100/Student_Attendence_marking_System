
const {Schema,model} = require('mongoose')

const studentSchema = new Schema({
    uuid4:{
        type:String,
        required:true
    },
    ssn:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone_number:{
        type:String,
        required:true,
        unique:true
    },
    class_fee:{
        type:String,
        required:true
    },
    attendence:[String],
    earlyleave:[String]
})

const studentModel = model('students',studentSchema)

module.exports = studentModel;