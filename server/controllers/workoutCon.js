const sql = require('../connection/db')

// get workout data from trackworkout table and the workout table itself
const getData = async(req,res)=>{
  const {user_id}=req.body
  try{
    await sql.connection.query(
      'SELECT * FROM track_workout WHERE user_id=?;',
      [user_id], (err, data)=>{
        if (err) console.log(err)
        res.json({ data: data});
    })
  }catch(err){
    console.log('catch', err);
  }
}

// create the data 
const createData = async(req, res)=>{
  const {user_id,type,date,weights,reps} = req.body
  // handle data for both tables at one time
  try{
    await sql.connection.query(
      'INSERT INTO track_workout (user_id,workout_type,weights,reps,date) VALUES (?,?,?,?,?)',
      [user_id,type,weights.join('-'),reps.join('-'),date], 
      (err)=>{
        if(err)console.log('queryErr', err)
        res.json({status:'success'})
      }
    )
  }catch(err){
    console.log('Catch', err)
  }
}

// update the workout data in both tables
const updateData = async(req,res)=>{
  const {track_id} =req.params
  const {type,weights,reps,date }= req.body

  try{
    await sql.connection.query(
      'UPDATE track_workout SET workout_type=?, weights=?, reps=?, date=?WHERE track_id=?',
      [type,weights.join('-'),reps.join('-'),date,track_id],
      (err, data)=>{
        if(err)console.log('queryErr',err)
        res.json({status:'updated'})
      }
    )
  }catch(err){console.log('catchErr', err)}

}

// delete data from both tables 
const deleteData = async(req, res)=>{
  const {track_id} = req.params
  try{
    await sql.connection.query(
      'DELETE FROM track_workout WHERE track_id = ?', 
      [track_id], (err, data)=>{
        if(err)console.log('QueryErr', err)
        res.json({status:'deleted'})
      }
    )
  }catch(err){
    console.log('Catch', err)
  }
}

module.exports = {
  getData,
  createData,
  updateData,
  deleteData
}