// install express with `npm install express` 
const express = require('express')
const studentModel = require('./models/students')
const mongoose = require('mongoose')
const uuidBase62 = require('uuid-base62');
const cors = require('cors')


const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/read',async(req,res)=>{
    try {
        const students = await studentModel.find()
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

app.get('/readOne/:uuid',async(req,res)=>{
    try {
        const {uuid} = req.params;
        const students = await studentModel.findOne({uuid})
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

app.post('/create',async(req,res)=>{
    try {
        const uuid = uuidBase62.v1()
        const {ssn,name,address,email,phone_number,class_fee} = req.body;
        const students = await studentModel.create({uuid,ssn,name,address,email,phone_number,class_fee,attendence:[],earlyleave:[]})
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

app.put('/update/:uuid/:action',async(req,res)=>{
    try {
        const {uuid,action} = req.params;
        const date = new Date()
        const {ssn,name,address,email,phone_number,class_fee,attendence,earlyleave} = await studentModel.findOne({uuid})
        if (action === 'enter') attendence.push(date.toUTCString())
        else if (action === 'leave') earlyleave.push(date.toUTCString())
        const student = await studentModel.updateOne({uuid},{ssn,name,address,email,phone_number,class_fee,attendence,earlyleave})
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

app.delete('/delete/:uuid',async(req,res)=>{
    try {
        const {uuid} = req.params;
        const student = await studentModel.deleteOne({uuid})
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        app.listen(3000,()=>{
            console.log('db conneted\nserver running:3000');
        })
    })
    .catch(err=>{
        console.error({error:err.message});
    })

// export 'app'
module.exports = app