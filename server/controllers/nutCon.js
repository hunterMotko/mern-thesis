const sql = require('../connection/db')

// get one rep max
const getNut = async(req,res)=>{
  const {user_id}=req.params
  try{
    await sql.connection.query(
      'SELECT * FROM nutrition_target WHERE user_id=? ;',
      [user_id], (err, data)=>{
        if (err) console.log(err)
        res.json({ data: data});
    })
  }catch(err){
    console.log('catch', err);
  }
}

// create one rep max
const createNut = async(req, res)=>{
  console.log(req.body)
  const {user_id,val}=req.body
  const { calories, protein , carbs , fat} = val
  // handle data for both tables at one time
  try{
    await sql.connection.query(
      'INSERT INTO nutrition_target (calories,protein,carbs,fat,user_id) VALUES (?,?,?,?,?)',
      [calories, protein, carbs, fat, user_id], 
      (err,data)=>{
        if(err)console.log('queryErr', err)
        if(data.insertId){
          res.json({status:'success'})
        }
      }
    )
  }catch(err){
    console.log('Catch', err)
  }
}

// delete onerep
const deleteNut = async(req, res)=>{
  const {user_id} = req.params
  try{
    await sql.connection.query(
      'DELETE FROM nutrition_target WHERE user_id = ?', 
      [user_id], (err, data)=>{
        if(err)console.log('QueryErr', err)
        if(data){
          res.json({status:'deleted'})
        }
      }
    )
  }catch(err){
    console.log('Catch', err)
  }
}

module.exports = {
  getNut,
  createNut,
  deleteNut
}