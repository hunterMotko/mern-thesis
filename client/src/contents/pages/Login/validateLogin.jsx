export default function validate(values){
  let errors={}
  // handle validation
  if(!values.username){
    errors.username = 'Enter a username'
  }else if(values.username.length < 8){
    errors.username = 'Must be longer than 8 characters'
  }
  
  if(!values.password){
    errors.password = 'enter a password'
  }else if(values.password.length < 2){
    errors.password = 'Must be longer than 2 characters'
  }

  return errors
}