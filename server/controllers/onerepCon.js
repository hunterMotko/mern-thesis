const sql = require('../connection/db')

// get one rep max
const getOneRep = async(req,res)=>{
  const {user_id}=req.params
  try{
    await sql.connection.query(
      'SELECT * FROM onerepmax WHERE user_id=? ;',
      [user_id], (err, data)=>{
        if (err) console.log(err)
        res.json({ data: data});
    })
  }catch(err){
    console.log('catch', err);
  }
}

// create one rep max
const createOneRep = async(req, res)=>{
  const {user_id,values:{bench,squat,deadlift,clean}}=req.body
  // handle data for both tables at one time
  try{
    await sql.connection.query(
      'INSERT INTO onerepmax (bench,squat,deadlift,clean,user_id) VALUES (?,?,?,?,?)',
      [bench,squat,deadlift,clean, user_id], 
      (err,data)=>{
        if(err)console.log('queryErr', err)
        if(data.insertId){
          res.json({status:'success', onerep_id:data.insertId})
        }
      }
    )
  }catch(err){
    console.log('Catch', err)
  }
}

// update the onerep table
const updateOneRep = async(req,res)=>{
  const {onerep_id} =req.params
  const {bench,squat, deadlift,clean}= req.body

  try{
    await sql.connection.query(
      'UPDATE onerepmax SET bench=?, squat=?, deadlift=?, clean=?WHERE onerep_id=?',
      [bench,squat, deadlift, clean,onerep_id],
      (err, data)=>{
        if(err)console.log('queryErr',err)
        if(data){
          res.json({status:'updated'})
        }
      }
    )
  }catch(err){console.log('catchErr', err)}

}

// delete onerep
const deleteOneRep = async(req, res)=>{
  const {onerep_id} = req.params
  try{
    await sql.connection.query(
      'DELETE FROM onerepmax WHERE onerep_id = ?', 
      [onerep_id], (err, data)=>{
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
  getOneRep,
  createOneRep,
  updateOneRep,
  deleteOneRep
}