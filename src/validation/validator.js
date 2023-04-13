const mongoose = require('mongoose')
//---------------------------------------validation of string------------------------------------------------------

const validString = (name) =>{
    return /^[a-zA-Z ]+$/.test(name)
}

//--------------------------------------------------------------------------------------------------------------------

//-------------------------------validation of number----------------------------------------------------------------------

const validNumber = (number) =>{
    return  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(number)
}

//-------------------------------------------------------------------------------------------------------------

//---------------------------validation of email-------------------------------------------------------------------------

const validEmail = (email) =>{
    return  /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
}

//--------------------------------------------------------------------------------------------------------------
//-------------------------------------------Validation for ObjectId check in DB -------------------------

const validObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
};

//---------------------------------------------------------------------------------------------------------

module.exports = {validString , validNumber , validEmail, validObjectId}