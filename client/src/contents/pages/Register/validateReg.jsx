export default function validate(values){
  let errors={}
  // validate registration
  if(!values.username){
    errors.username = 'Enter a username'
  }else if(values.username.length < 8){
    errors.username = 'Must be longer than 8 characters'
  }
  
  if(!values.email){
    errors.email = 'Email Address is Required!'
  }else if(!/\S+@\S+\.\S+/.test(values.email)){
    errors.email='Email Address is invalid'
  }
  
  if(!values.password){
    errors.password = 'enter a password'
  }else if(values.password.length < 8){
    errors.password = 'Password is to short'
  }
  
  if(!values.verifyPassword || values.password!==values.verifyPassword){
    errors.verifyPassword = 'Need to enter same as password to verify'
  }

  return errors
}