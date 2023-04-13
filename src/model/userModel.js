const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
    employeeFullName : {
      type : String ,
      required : true
    },

    jobTitle : {
        type : String ,
        required : true
      },

      phoneNumber : {
        type : Number,
        unique : true ,
        required : true
      },

      email :{
        type : String ,
        unique : true,
        required : true
      },

      address :{
        type : String ,
        required : true
      },

      city :{
        type : String ,
        required : true
      },

      state : {
        type : String ,
        required : true
      },
      emergencyContacts: {
       primary:{ 
        name: {
          type: String,
          required: true
        },
        number: {
          type: String,
          required: true
        },
        relationship: {
          type: String,
          required: true
        }
       } ,

       secondary:{ 
        name: {
          type: String,
          required: true
        },
        number: {
          type: String,
          required: true
        },
        relationship: {
          type: String,
          required: true
        }
       }
      },

  isDeleted :{
    type : Boolean ,
    default : false
  } 

},{timestamps : true})

module.exports = mongoose.model('user',userSchema)