var mongoose = require('mongoose');
// define our students model
// module.exports allows us to pass this to other files when it is called
const schema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    passwrd:{
        type:String
    }
});

console.log("Schema");
module.exports = mongoose.model('Users',schema);


