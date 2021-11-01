const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const sql = require('../connection/db')
const loginCon = require('../controllers/loginCon')
const onerepCon = require('../controllers/onerepCon')
const workOutCon = require('../controllers/workoutCon')
const nutLogCon = require('../controllers/nutLogCon')
const nutCon = require('../controllers/nutCon')
// serialize user info
passport.serializeUser(function(user, cb){
  console.log('ppse')
  cb(null, user)
})

// get user data to check from user table
passport.deserializeUser(function(id, cb){
  sql.connection.query('select * from user where user_id = ?',
    [id.user_id],((err, user)=>{
      console.log('ppde')
      cb(err, user)
  }))
})

// passport for extra user authentication
passport.use(new LocalStrategy(
  function(username, password, done) {
    sql.connection.query(
      'SELECT * FROM user WHERE username = ?',
      [username],
      (err, user)=>{
        user = user[0]
        if(err){
          return done(err)
        } 
        if(!user) {
          return done(null, false)
        }
        if(!bcrypt.compareSync(password, user.password)){
          return done(null, false)
        }
        return done(null, user)
    })
  }
));

// handle routes 
router.post('/register', loginCon.register)
router.post('/login', passport.authenticate('local', 
  {failureRedirect: '/error', session: false}), loginCon.logIn
)
router.post('/user', loginCon.user)
router.post('/logOut/:user_id', loginCon.logOut)
// onerep routes
router.get('/custom/:user_id', onerepCon.getOneRep)
router.post('/custom', onerepCon.createOneRep)
router.post('/custom/update/:onerep_id', onerepCon.updateOneRep)
router.delete('/custom/delete/:onerep_id', onerepCon.deleteOneRep)

// workout routes
router.post('/trackWorkout', workOutCon.getData)
router.post('/trackWorkout/:id', workOutCon.createData)
router.post('/trackWorkout/update/:track_id', workOutCon.updateData)
router.delete('/trackWorkout/del/:track_id', workOutCon.deleteData)

// nutrition target routes
router.get('/nutrition/:user_id', nutCon.getNut)
router.post('/nutrition', nutCon.createNut)
router.delete('/nutrition/delete/:user_id', nutCon.deleteNut)

// nutLog routes
router.get('/logNutrition/:user_id', nutLogCon.getData)
router.post('/logNutrition/:user_id', nutLogCon.createLog)
router.post('/logNutrition/update/:log_id/:user_id', nutLogCon.updateLog)
router.delete('/logNutrition/delete/:log_id/:user_id', nutLogCon.deleteLog)

module.exports = router