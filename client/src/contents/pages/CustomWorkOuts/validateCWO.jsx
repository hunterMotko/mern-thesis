
export default function validate(values){
  let errors={}
  // handle validation
  if(!values.name){
    errors.name = 'Name Required!'
  }
  if(!values.bench||values.bench.length <2){
    errors.bench = 'Entry Reqiured'
  }
  if(!values.squat||values.squat.length <2){
    errors.squat = 'Entry Reqiured'
  }
  if(!values.deadlift||values.deadlift.length <2){
    errors.deadlift = 'Entry Reqiured'
  }
  if(!values.clean||values.clean.length <2){
    errors.clean = 'Entry Reqiured'
  }
  return errors
}