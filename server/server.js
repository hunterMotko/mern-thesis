const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3113;
const passport = require('passport');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes/afRouter')
const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:3000'

// connect db
require('./connection/db')
// start cookies
app.use(cookieParser())
// handle form info/json
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// handle passport init
app.use(passport.initialize());
app.use(passport.session());
// cross-site
app.use('/api', cors({origin, credentials: true }))
// log cookies
app.use((req,res,next)=>{
  // console.log('cook', req.cookies)
  next()
})
// use americanfitness router 
app.use('/api', router)



app.listen(port , () => console.log('App listening on port ' + port));