const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRouter = require('./routers/exproutes');
const Users = require('./app/models/users');
const db = require('./config/db');

const app = express();
//const mongoose = require('mongoose');
const port = 5000;
console.log("connecting..",db);

app.use(cors());
//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());
app.use(studentRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

app.get('/',(req, res)=> res.send('Express app running'));

app.post('/api/user/send',(req,res)=>{

    console.log(req.body)
    let user = new Users({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        passwrd:req.body.passwrd
    });

    user.save().then((doc)=>{
        console.log(doc);
    }).catch((err)=>{
        console.log(err);
    })
});
app.put('/api/user/update',(req,res)=>{

    console.log(req.body.id);
    Users.findOneAndUpdate(
        {
            _id : req.body.id
        },
        {
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone
        },
        {
          new: true, // return updated doc
          runValidators: true // validate before update
        }
      )
        .then((doc) => {
          console.log(doc);
        })
        .catch((err) => {
          console.error(err);
        });
});
app.put('/api/user/login',(req,res)=>{
    console.log(req.body.email);

    
    Users.find({
        email : req.body.email
    }).then((err, result) => {
        console.log(result);
        if(result)
        {
            res.send(result);
        }
        else{
            console.log("User does not exist");
        }
        if (err) {
          res.send(err);
        }
       
      })
});
app.delete('/api/user/delete',(req,res)=>{
    
    console.log(req.body.id);
    //let  studt = new Users();
    Users.findOneAndDelete({
        _id : req.body.id
    })
    .then((response)=>{console.log(response);})
    .catch((err)=>{
        console.log(err);
    });
});
/*app.delete('/api/students/:student_id', function (req, res) {
    //var student = new Student(); // create a new instance of the student model

    try{
        Student.deleteOne({
    _id: req.params.student_id
    });
    }
    catch(err)
    {
        res.send(err);
    }

});*/


app.listen(port, ()=>console.log(`Example app listening on port ${port}!`));
