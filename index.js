// install express with `npm install express` 
const express = require('express')
const studentModel = require('./models/students')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/',studentModel)


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