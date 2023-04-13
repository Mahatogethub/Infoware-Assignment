 const userModel = require('../model/userModel')
 const {validString , validNumber , validEmail,validObjectId} = require('../validation/validator')

 //----------------------------------------create user-------------------------------------------------------------
 const createUser = async (req,res) =>{
    try{
    let data = req.body ;

    //--------------------------------------destructuring--------------------------------------------------
    let {employeeFullName , jobTitle ,phoneNumber, email,address,city, state,emergencyContacts} = data ;
    //---------------------------------------------------------------------------------------------------

    //---------------------------------------No data is present in body---------------------------------
    if(Object.keys(data).length == 0){
        return res.status(400).send({status: false ,message :'Provide some data in body'})
    }
    //---------------------------------------------------------------------------------------------------

    //------------------------checking availabilty and validation---------------------------------------
    if(!employeeFullName){
        return res.status(400).send({status: false ,message :'Full Name is mandatory'})
    }

    if(!validString(employeeFullName)){
        return res.status(400).send({status: false ,message :'Full Name is should be valid'})
    }

    if(!jobTitle){
        return res.status(400).send({status: false ,message :'Job title is mandatory'})
    }

    if(!validString(jobTitle)){
        return res.status(400).send({status: false ,message :'Job title should be valid'})
    }

    if(!phoneNumber){
        return res.status(400).send({status: false ,message :'Phone Number is mandatory'})
    }

    if(!validNumber(phoneNumber)){
        return res.status(400).send({status: false ,message :'Phone number should be valid'})
    }

    if(!email){
        return res.status(400).send({status: false ,message :'Email is mandatory'})
    }

    if(!validEmail(email)){
        return res.status(400).send({status: false ,message :'Email should be valid'})
    }
    //--------------------------------------------------------------------------------------------------

    //--------------------------checking uniqueness of phone number and email---------------------------

    let unique = await userModel.findOne({$or : [{phoneNumber : phoneNumber} , {email : email}]})

    if(unique){
         if(unique.phoneNumber == phoneNumber){
            return res.status(400).send({status: false , message : 'Phone number should be unique'})
        }
        else if(unique.email == email){
            return res.status(400).send({status: false , message : 'Email should be unique'})
        }
    }

    //-----------------------------------------------------------------------------------------------------

    //----------------------------------checking availability and validation-------------------------------
    if(!address){
        return res.status(400).send({status: false ,message :'Address is mandatory'})
    }

    if(!validString(address)){
        return res.status(400).send({status: false ,message :'Address is should be valid'})
    }

    if(!city){
        return res.status(400).send({status: false ,message :'City is mandatory'})
    }

    if(!state){
        return res.status(400).send({status: false ,message :'State is mandatory'})
    }

    if(!validString(state)){
        return res.status(400).send({status: false ,message :'State is should be valid'})
    }

    if(!emergencyContacts){
        return res.status(400).send({status: false ,message :'emergencyContacts is mandatory'})
    }

    const {primary , secondary} = emergencyContacts
    if(!primary){
        return res.status(400).send({status: false ,message :'Primary detail is mandatory'})
    }

    if(!primary.name){
        return res.status(400).send({status: false ,message :'Primary name is mandatory'})
    }

    if(!validString(primary.name)){
        return res.status(400).send({status: false ,message :'Primary name should be valid'})
    }

    if(!primary.number){
        return res.status(400).send({status: false ,message :'Primary Number is mandatory'})
    }

    if(!validNumber(primary.number)){
        return res.status(400).send({status: false ,message :'Primary number should be valid'})
    }

    if(!primary.relationship){
        return res.status(400).send({status: false ,message :'Primary relationship is mandatory'})
    }

    if(!validString(primary.relationship)){
        return res.status(400).send({status: false ,message :'Primary relationship is mandatory'})
    }


    if(!secondary.name){
        return res.status(400).send({status: false ,message :'secondary name is mandatory'})
    }

    if(!validString(secondary.name)){
        return res.status(400).send({status: false ,message :'Secondary name should be valid'})
    }

    if(!secondary.number){
        return res.status(400).send({status: false ,message :'secondary Number is mandatory'})
    }

    if(!validNumber(secondary.number)){
        return res.status(400).send({status: false ,message :'Secondary number should be valid'})
    }

    if(!secondary.relationship){
        return res.status(400).send({status: false ,message :'secondary relationship is mandatory'})
    }

    
    if(!validString(secondary.relationship)){
        return res.status(400).send({status: false ,message :'Secondary relationship is mandatory'})
    }

    //------------------------------------------------------------------------------------------------------

    //--------------------------------creating user----------------------------------------------------
    const create = await userModel.create(data)

    return res.status(201).send({status : true , data : create})

    //--------------------------------------------------------------------------------------------------
 }
 catch(err){
    return res.status(500).send({status: false ,message : err.message})
 }
}

//----------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------get user--------------------------------------------------------
const getUser = async (req,res) =>{
  try{
    let obj = {isDeleted :false} ;

    //---------------------------------fetching all data--------------------------------------
    let savedData = await userModel.find(obj)
    //---------------------------------------------------------------------------------------
    //---------------------------no such data is present--------------------------------------
    if (savedData.length == 0) {
      return res.status(404).send({ status: false, message: "no document found" })
    }
    //----------------------------------------------------------------------------------------

    return res.status(200).send({ status: true, message: savedData })
  
  }
  catch(err){

    return res.status(500).send({status: false ,message : err.message})
  }
}

//------------------------------------------------------------------------------------------------------------------

//---------------------------------------------update user------------------------------------------------------
const updateUser = async (req,res) =>{
    try{
         let reqBody = req.body ;
         const userId = req.params.userId
        //--------------------------------if no data is present for update------------------------------ 
        if (Object.keys(reqBody).length == 0) {
            return res.status(400).send({status: false,msg: "Please provide some data to update"});
          }
        //---------------------------------------------------------------------------------------------
         
        //----------------------------validating userId------------------------------------------------
          if (!validObjectId(userId)) {
             return res.status(400).send({ message: "userId is InValid", status: false }) 
            }

        //---------------------------------------------------------------------------------------------

        //-----------------------------------No user exist---------------------------------------------
          let alreadyDeleted = await userModel.findOne({ _id: userId, isDeleted: true });
          if (alreadyDeleted) return res.status(400).send({ msg: "No user register" });
      //------------------------------------------------------------------------------------------------
      
       let {employeeFullName , jobTitle ,phoneNumber, email,address,city, state} = reqBody ;

     //-----------------------------avail
    
    if(employeeFullName){
    if(!validString(employeeFullName)){
        return res.status(400).send({status: false ,message :'Full Name is should be valid'})
    }
   }

    if(phoneNumber){
    if(!validNumber(phoneNumber)){
        return res.status(400).send({status: false ,message :'Phone number should be valid'})
     }
   }

    if(email){
    if(!validEmail(email)){
        return res.status(400).send({status: false ,message :'Email should be valid'})
    }
   }

    let unique = await userModel.findOne({$or : [{phoneNumber : phoneNumber} , {email : email}]})

    if(unique){
         if(unique.phoneNumber == phoneNumber){
            return res.status(400).send({status: false , message : `${phoneNumber} already registered, try another.`})
        }
        else if(unique.email == email){
            return res.status(400).send({status: false , message : `${email} already registered, try another.` })
        }
    }

    if(address){
    if(!validString(address)){
        return res.status(400).send({status: false ,message :'Address is should be valid'})
    }
   }
    if(state){
    if(!validString(state)){
        return res.status(400).send({status: false ,message :'State is should be valid'})
    }
   }


    const userUpdate = await userModel.findOneAndUpdate(
        {_id:userId},
         { $set: {
            employeeFullName : employeeFullName,
             jobTitle : jobTitle,
             phoneNumber : phoneNumber,
              email : email,
              address : address,
              city : city, 
              state : state,
         } 
        }, 
         { new: true })

    return res.status(200).send({ status: true, message: "Update successfully done", data: userUpdate })


    }
    catch(err){
        return res.status(500).send({status: false ,message : err.message})
    }
}

//------------------------------------------------------------------------------------------------------------

//----------------------------Delete user -------------------------------------------------------------

const deleteUser = async (req,res) =>{
    try{
     let userId = req.params.userId ;
    
     if (!validObjectId(userId)) {
        return res.status(400).send({ message: "userId is InValid", status: false }) 
       }
     //------------------------------already deleted-------------------------------------------
       let alreadyDeleted = await userModel.findOne({
        _id: userId,
        isDeleted: true,
      });
      if (alreadyDeleted)
        return res.status(404).send({ message: "This user is do not exist" });
     //----------------------------------------------------------------------------------

     //--------------------------------deleting the user ----------------------------------------
      let deleteData = await userModel.findOneAndUpdate(
        { _id: userId },
        { 
            $set: { isDeleted: true } 
        }
      );
      //-----------------------------------------------------------------------------------------
     
      //--------------------------this user do not exist----------------------------
      if (!deleteData)
        return res.status(404).send({ message: "This user does not exist" });
     //-------------------------------------------------------------------------------
      res.status(200).send({ status: true, message: "User deleted Successfully" });
    }
    catch(err){
        return res.status(500).send({status:false , message : err.message})
    }
}

//------------------------------------------------------------------------------------------------------------------

module.exports = {createUser ,getUser, updateUser , deleteUser} 
