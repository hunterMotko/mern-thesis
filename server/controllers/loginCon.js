const jwt = require('jsonwebtoken')
const jwtSecret = 'thelastmile-hunter.motko.939158'
const bcrypt = require('bcrypt')
const sql = require('../connection/db')

// handle user registration while encrypting password
const register = (req, res)=>{
  const {username,email,password}=req.body
  try{
    sql.connection.query('INSERT INTO user (username, password, email) VALUES (?, ?, ?)',
     [username, bcrypt.hashSync(password, bcrypt.genSaltSync(8), null), email], (err, result)=>{
      if(err)console.log(err)
      if(result){
        res.json({status:'success'})
      }
    })
  }catch(err){
    console.log('catchError', err)
  }
}

// handle user login
const logIn = (req, res)=>{
  const {user_id, username} = req.user
  const credentials = {signedIn:true, user_id,username}
  try{
    sql.connection.query(
      'UPDATE user SET signedIn=? WHERE user_id=?', [`${credentials.signedIn}`, user_id],(err, data)=>{
        if(err)console.log('queryErr'+err)
        if(data){
            const token = jwt.sign(credentials, jwtSecret);
            res.cookie('jwt', token, { httpOnly: true});
            res.json(credentials)
        }
      }
    )
  }catch(err){console.log('catchErr'+err)}
}

function getUser(req) {
  // check for cookies
  const token = req.cookies.jwt;
  if (!token) return { signedIn: false };

  // make sure web tokens are ok and send
  try {
    const credentials = jwt.verify(token, jwtSecret);
    return credentials;
  } catch (error) {
    return { signedIn: false };
  }
}

// send tokens to client
const user = (req, res)=>{
  res.json(getUser(req));
}

// log user out and clear cookies and tokens
const logOut = (req, res)=>{
  const{user_id}=req.params
  const credentials = {signedIn: false, user_id:'', username:''}
  try{
    sql.connection.query(
      'UPDATE user SET signedIn=? WHERE user_id=?',
      [`${credentials.signedIn}`, user_id],
      (err, data)=>{
        if(err)console.log('queryErr'+err)
        if(data){
          res.clearCookie('jwt');
          req.logout();
          res.json(credentials);
        }
      }
    )
  }catch(err){console.log('catchErr'+err)}
}

module.exports = {
  register,
  logIn,
  user, 
  logOut
}