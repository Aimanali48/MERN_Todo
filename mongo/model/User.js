const mongoose  = require('mongoose')

const user_shema = mongoose.Schema({
     name : {
         type : String,
         required : true
     },

     rcpname : {
        type : String,
        required : true
    },
    
    recipe: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model("User" , user_shema)