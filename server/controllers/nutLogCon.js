const sql = require('../connection/db')

const getData = async(req, res)=>{
  const {user_id}=req.params
  try{
    await sql.connection.query(
      'SELECT * FROM nutrition_log WHERE user_id=?',
      [user_id], (err, data)=>{
        if (err) console.log(err)
        res.json({ data: data});
    })
  }catch(err){
    console.log('catch', err);
  }
}

const createLog = async(req, res)=>{
  const {user_id} = req.params
  const {date,calories,protein,carbs,fat} = req.body
  try{
    sql.connection.query(
      'INSERT INTO nutrition_log (user_id,date,calories,protein,carbs,fat) VALUES (?,?,?,?,?,?)',
      [user_id,date,calories,protein,carbs,fat],
      (err, data)=>{
        if(err)console.log('queryErr'+err)
        res.json({status:'created'})
      }
    )
  }catch(err){
    console.log('catch'+err)
  }
}

const updateLog =async(req, res)=>{
  const {log_id, user_id} =req.params
  const {date,calories,protein,carbs,fat} =req.body
  try{
    sql.connection.query(
      'UPDATE nutrition_log SET date=?, calories=?, protein=?, carbs=?, fat=? WHERE log_id=? AND user_id=?',
      [date,calories,protein,carbs,fat, log_id,user_id],
      (err, data)=>{
        if(err)console.log('queryErr')
        if(data){
          res.json({status:'updated'})
        }
      }
    )
  }catch(err){
    console.log('catchErr',err)
  }
}

const deleteLog=async(req, res)=>{
  const {log_id,user_id}=req.params
  try{
    sql.connection.query('DELETE FROM nutrition_log WHERE log_id=? AND user_id=?',
    [log_id,user_id],(err, data)=>{
      if(err)console.log('queryErr',err)
      if(data){
        res.json({status:'deleted'})
      }
    })
  }catch(err){
    console.log('catchErr', err)
  }
}

module.exports = {
  getData,
  createLog, 
  updateLog, 
  deleteLog
}