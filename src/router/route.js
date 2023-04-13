const express = require('express') ;

const router = express.Router() ;

const userController = require('../controller/userController')


router.post('/create' , userController.createUser) ;

router.get('/getdata' , userController.getUser) ;

router.put('/update/:userId' , userController.updateUser) ;

router.delete('/delete/:userId' , userController.deleteUser )


module.exports = router