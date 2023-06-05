const mongoose = require('mongoose');

 // mongoose.connect('mongodb://0.0.0.0:27017/test')
 
mongoose.connect("mongodb://0.0.0.0:27017/palace",{

 useNewUrlParser : true,
 useUnifiedTopology : true
}).then(()=>{
 console.log("Connected to database");
}).catch(error => {
 console.log("Unable to connect to database",error);
});

module.exports = {
    db : 'mongodb://0.0.0.0:27017/palace'  //replaced localhost by 0.0.0.0
}
    