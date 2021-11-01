export default function validate(values){
  let errors={}
  // handle validation
  if(!values.name){
    errors.name = 'Name Required!'
  }
  if(!values.weight){
    errors.weight = 'Entry Reqiured'
  }
  if(!values.bodyfat){
    errors.bodyfat = 'Entry Reqiured'
  }
  if(!values.weightgoal){
    errors.weightgoal = 'Must Pick One'
  }
  return errors
}