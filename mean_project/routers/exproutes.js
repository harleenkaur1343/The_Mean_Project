const express = require('express');
const Users = require('../app/models/users');
//creating a new express router 
const router = new express.Router();


router.get('/api/users', async (req,res)=>{
   
    try{

        // get the data of all students '
        const students = await Users.find();
        res.status(200).send(students);
    }
    catch(error)
    {
        res.status(500).send(error);
    }
});
module.exports = router;