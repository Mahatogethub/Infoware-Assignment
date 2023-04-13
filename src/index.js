const mongoose = require('mongoose') ;
const express = require('express') ;
const route = require('./router/route')

const app = express() ;

app.use(express.json()) ;

//----------------------------------------connecting mongodb---------------------------------------------------------

mongoose.connect('mongodb+srv://Ranamahato:9XBWNazgyvZ41FGS@rana.1qocv4g.mongodb.net/Infoware-Assignment',

 {useNewUrlParser : true}
)

.then(() => console.log('mongoose is connected')) 

.catch((err) => console.log(err.message)) ;

//--------------------------------------------------------------------------------------------------------------------

app.use('/' , route)

app.listen(3000,() =>{
    console.log(`express is connected at ${3000}`);
})