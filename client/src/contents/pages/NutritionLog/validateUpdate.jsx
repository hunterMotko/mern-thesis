export default function validate(values){
  let errors={}
  // handle validation
  if(!values.date||values.date.length<8){
    errors.date = 'date Required!'
  }
  if(!values.calories||values.calories.length<1){
    errors.calories = 'calories Required!'
  } 
  if(!values.protein||values.protein.length<1){
    errors.protein = 'protein Required!'
  } 
  if(!values.carbs||values.carbs.length<1){
    errors.carbs = 'carbs Required!'
  }
  if(!values.fat||values.fat.length<1){
    errors.fat = 'fat Required!'
  }
  return errors
}