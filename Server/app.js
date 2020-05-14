const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

require('./Employee')

app.use(bodyParser.json())

const Employee = mongoose.model('employee')

const mongoUrl = 'mongodb+srv://tamer:Tamer209@cluster0-4rgqb.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', ()=>console.log('connected to mongo'))

mongoose.connection.on('error', (error)=>console.log('error: ', error))

app.get('/', (req,res)=>{
    Employee.find({})
    .then(data => {
        res.send(data)
    }).catch(error => console.log(error))
})

app.post('/send-data', (req,res)=>{

    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position
    })

    employee.save().then(data => {
        res.send('success')
    }).catch(error => console.log(error))

})

app.post('/delete', (req,res)=>{

    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        res.send('deleted')
    })
    .catch(error => console.log(error))

})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position
    }).then(data=>{
        res.send('updated')
    }).catch(error => console.log(error))
})


app.listen(3000, ()=>{console.log('server running')})


/*
    "name":"tamer",
    "email":"tameradel209@icloud.com",
    "phone":"01207350507",
    "picture":"tamer.png",
    "salary":"6000",
    "position":"Software Engineer"
*/