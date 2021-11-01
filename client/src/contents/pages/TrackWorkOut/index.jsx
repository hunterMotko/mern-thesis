import React, {useState, useContext, useEffect}from 'react'
import UserContext from '../../../App/UserContext'
import InputField from '../Helpers/InputField';


const TrackWorkOut = () =>{
  // use user information to track workouts
  const{username, user_id} = useContext(UserContext)
  const [data, setData] =useState([])

  // get the users workouts information
  const getData = async()=>{
    try{
      const res = await fetch('/api/trackWorkout',{
        method:'POST', 
        body: JSON.stringify({user_id}),
        headers: {'Content-Type':'application/json'}
      })
      const body = await res.text()
      const result = JSON.parse(body)
      setData(result.data)
    }catch(err){
      console.log('catchError', err)
    }
  }

  // component did mount
  useEffect(()=>{
    if(user_id)getData()
  },[user_id])

  return(
    <div className="trackworkout">
      <div className="ui center aligned container">
      <div className='ui raised inverted segment'>
        <h1>{` Welcome ${username} Start tracking your workouts here`}</h1>
      </div>
        {(data.length<1)?
          <></>
          :
          <ShowData data={data}/>
        }
        <WeeklyTarget data={data} user_id={user_id}/>
        <WorkOutChoice username={username} user_id={user_id}/>
      </div>
    </div>
  )
}

const WeeklyTarget = ({data, user_id})=>{
  const [target, setTarget]=useState({})
  
  useEffect(()=>{
    if(data.length>0) getTargetData()
  },[data])
  

  const getTargetData=async()=>{
    try{
      const res = await fetch(`/api/custom/${user_id}`)
      if(res<200||res>299){
        console.log('fetchErr')
      }else{
        const body = await res.json()
        if(body.data.length>0){
          calculateTarget(body.data[0])
        }
      }
    }catch(err){
      console.log('catchError', err)
    }
  }

  function calculateTarget(obj){
    let benArr,sqArr,dlArr,clArr
    const {bench,squat,deadlift,clean}=obj
    data.map(({workout_type, weights})=>{
      if(workout_type === 'bench'){
        benArr=[...weights.split('-').filter(x=>x!=='')].reduce(
          (a,b)=>parseInt(a)+parseInt(b)
        )/weights.split('-').filter(x=>x!=='').length
      }
      if(workout_type === 'squat'){
        sqArr=[...weights.split('-').filter(x=>x!=='')].reduce(
          (a,b)=>parseInt(a)+parseInt(b)
        )/weights.split('-').filter(x=>x!=='').length
      }
      if(workout_type === 'deadlift'){
        dlArr=[...weights.split('-').filter(x=>x!=='')].reduce(
          (a,b)=>parseInt(a)+parseInt(b)
        )/weights.split('-').filter(x=>x!=='').length
      }
      if(workout_type === 'clean'){
        clArr=[...weights.split('-').filter(x=>x!=='')].reduce(
          (a,b)=>parseInt(a)+parseInt(b)
        )/weights.split('-').filter(x=>x!=='').length
      }
    })
    const doCalc =(a,b)=>(Math.round((Math.round(((85/100)*((a+parseInt(b))/2))))/5)*5)
    setTarget({
      bench: (benArr)?doCalc(benArr, bench):Math.round(bench*.85),
      squat: (sqArr)?doCalc(sqArr, squat): Math.round(squat*.85),
      deadlift: (dlArr)?doCalc(dlArr, deadlift):Math.round(deadlift*.85),
      clean:(clArr)?doCalc(clArr, clean):Math.round(clean*.85)
    })
  }

  return(
    <div className="ui raised inverted segment">
      <h1>Weekly Weight Targets</h1>
      {(target&&data.length>0)?
          <Target target={target}/>
        :
        <div className="ui segemnt">
          <h3>We're sorry do you have a One Rep Max Saved?</h3>
          <div 
          className="ui inverted blue icon button"
          onClick={()=>window.location.href='/custom'}
          >
            Find Your OneRepMax <i className='right arrow icon'></i>
          </div>
        </div>
      }
    </div>
  )
}

const Target =({target})=>{
  const {bench, squat, deadlift, clean}=target
  return(
    <div className="ui four column grid">
      <div className="column">
        <div className="card">
          <div className="content">
            <h3>Bench</h3>
            <p>Weight: {bench}</p>
            <p>Reps: 6-8</p>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="card">
          <div className="content">
            <h3>Squat</h3>
            <p>Weight: {squat}</p>
            <p>Reps: 6-8</p>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="card">
          <div className="content">
            <h3>Deadlift</h3>
            <p>Weight: {deadlift}</p>
            <p>Reps: 6-8</p>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="card">
          <div className="content">
            <h3>Clean</h3>
            <p>Weight: {clean}</p>
            <p>Reps: 6-8</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// show each piece of data for table
const Dati = ({x, setToggle, setTrack})=>{
  const weights = x.weights.split('-')
  const reps = x.reps.split('-')
  const updateClick=()=>{
    setTrack(x.track_id)
    setToggle(true)
  }

  // delete workout info
  const handleDelete = async()=>{
    let res= await fetch(`/api/trackWorkout/del/${x.track_id}`,{method: 'DELETE'})
    if(res.status<200||res.status>299){
      console.log('Problem Deleting')
    }else{
      const body = await res.text()
      const result = JSON.parse(body)
      if(result.status === 'deleted'){
        return window.location.href = '/trackwo'
      }
    }
  }

  return(
  <div className="column">
    <div className='ui card'>
      <div className="content">
        <p className='header'>{x.workout_type}</p>
      </div>
      <div className="content">
        <div className="description">
          <div className="ui list">
            <div className='item'><b>Date:</b> {x.date.slice(0,10)}</div>
            <div className='item'><b>Set 1:</b> {weights[0]}-{reps[0]}</div>
            <div className='item'><b>Set 2:</b> {weights[1]}-{reps[1]}</div>
            <div className='item'><b>Set 3:</b> {weights[2]}-{reps[2]}</div>
            <div className='item'><b>Set 4:</b> {weights[3]}-{reps[3]}</div>
            <div className='item'><b>Set 5:</b> {weights[4]}-{reps[4]}</div>
            <div className='item'><b>Set 6:</b> {weights[5]}-{reps[5]}</div>
            <div className='item'><b>Set 7:</b> {weights[6]}-{reps[6]}</div>
            <div className='item'><b>Set 8:</b> {weights[7]}-{reps[7]}</div>
          </div>
        </div>
      </div>
      <div className="ui two bottom attached buttons">
        <button className='ui icon green button' onClick={updateClick}>Update</button>
        <button className='ui icon red button' onClick={handleDelete}>delete</button>
      </div>
    </div>
  </div>

  )
}
    

const ShowData = ({data})=>{
  const [toggle, setToggle]=useState(false)
  const [track, setTrack] =useState(0)
  // map out each workout
  let sortData = data.sort((a,b)=>(a.date<b.date)?-1:1)
  let workData = sortData.map(x=>
      <Dati key={x.track_id} x={x} setToggle={setToggle} setTrack={setTrack}/>
  )

  return(
  <>
  {(toggle) ? 
    <UpdateData 
      data={data} 
      track={track} 
      setToggle={setToggle}
    /> :
    <div className="ui raised inverted segment">
      <div className='ui three column doubling grid'>
        {workData}
      </div >
    </div>
    
    
  }
  </>
  )
}

const UpdateData = ({data,track,setToggle})=>{
  // check that it is correct info to update
  const [findData] = data.filter(x=>track===x.track_id)

  const {
    track_id,workout_type,date,weights,reps
  }=findData

  const w = weights.split('-')
  const r = reps.split('-')
  // controlled component
  const [values, setValues] = useState({
    type:workout_type, date: date.slice(0,10), 
    w1:w[0],w2:w[1], w3:w[2],w4:w[3],w5:w[4],w6:w[5],w7:w[6],w8:w[7],
    r1:r[0],r2:r[1], r3:r[2],r4:r[3],r5:r[4],r6:r[5],r7:r[6],r8:r[7]
  })

  // handle onChange for controlled component
  const handleChange=e=>{
    const {name, value} = e.target
    setValues({
      ...values,
      [name]:value
    })
  }

  // Send updated info to database
  async function update(){
    let weights =[], reps = [], date = values.date, type = values.type
    Object.entries(values).map(([key, val],i)=>{
      console.log(typeof key, val)
      if(key === `w${i-1}`){
        weights.push(val)
      }
      if(key === `r${i-9}`){
        reps.push(val)
      }
    })
    try {
      let res = await fetch(`/api/trackworkout/update/${track_id}`, {
        method: 'POST',
        body: JSON.stringify({weights, reps, date, type}),
        headers: {'Content-Type':'application/json'}
      })
      if(res.status<200||res.status>299){
        console.log('Problem Deleting')
      }else{
        const body = await res.text()
        const result = JSON.parse(body)
        if(result.status === 'updated'){
          return window.location.href = '/trackwo'
        }
      }
    }catch(err){
      console.log('catchError', err)
    }
  }

  // Finish update
  const handleSubmit=e=>{
    e.preventDefault()
    update()
  }

  return(
  <div className='ui raised inverted segment'>
    <h1>Update Your Workout Here</h1>
    <form className='ui form' onSubmit={handleSubmit}>
      <div className="ui two column grid">
        <div className="row">
          <div className="column">
            <InputField 
            type="date" 
            name="date" 
            value={values.date} 
            change={handleChange}/>
          </div>
          <div className="column">
            <div className='field' >
              <label className='ui label'>Workout Type</label>
              <select name='type' value={values.type} onChange={handleChange}>
                <option value="bench">Bench</option>
                <option value="Squat">Squat</option>
                <option value="deadlift">Deadlift</option>
                <option value="clean">Clean</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          {[...Array(8)].map((_, i)=>
            <div className='column' key={i}>
              <div className="field">
                <label className='ui inverted red label'>Set {i+1}</label>
                <InputField
                  type='number'
                  name={`w${i+1}`}
                  value={values[`w${i+1}`]}
                  change={handleChange}
                />
                <InputField
                  type='number' 
                  name={`r${i+1}`} 
                  value={values[`r${i+1}`]} 
                  change={handleChange} 
                />
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="column">
            <button className='ui green inverted button'>Update</button>
          </div>
          <div className="column">
            <button className='ui red inverted button'
              onClick={()=>setToggle(false)}
            >Cancel</button>
          </div>    
        </div>
      </div> 
    </form>
  </div>
  )
}

const WorkOutChoice=(props)=>{
  const[values, setValues] = useState({workOutType: '', sets:0, date:''})
  const [done, setDone] = useState(false)
  
  // onChange
  const handleChange = e =>{
    const {name, value} = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  // if values are there continue process
  const submit =(e)=>{
    e.preventDefault()
    if(values.workOutType&&values.sets&&values.date){
      setDone(true)
    }
  }
  return(
  <div className='ui raised inverted segment'>
    {(done)?
    <TypeForm date={values.date} type={values.workOutType} sets={parseInt(values.sets)} {...props}/>
    :
    <form className='ui form' onSubmit={submit}>
      <div className="field">
        <h2>What day did you work out?</h2>
        <input type="date" name="date" value={values.date} onChange={handleChange}/>
      </div>
      <div className="field">
        <h2>What Core Workout did you do today?</h2>
        <select name="workOutType" value={values.workOutType} onChange={handleChange}>
          <option value="">( Select A Core Workout)</option>
          <option value="bench">Bench</option>
          <option value="squat">Squat</option>
          <option value="deadlift">Deadlift</option>
          <option value="clean">Clean</option>
        </select>
      </div>
      <div className="field">
        <h2>How Many Set Did You Finish?</h2>
        <select name="sets" value={parseInt(values.sets)} onChange={handleChange}>
          <option value="">( How Many Sets? )</option>
          <option value='3'>3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
      <button className='ui green inverted button' type="submit">Next <i className='ui right arrow icon'></i></button>
    </form>
    }
  </div>
  )
}

const TypeForm = ({date, type, sets, user_id})=>{
  //values for controlled component
  const [values, setValues]= useState({
    w1:'',w2:'', w3:'',w4:'',w5:'',w6:'',w7:'',w8:'',
    r1:'',r2:'', r3:'',r4:'',r5:'',r6:'',r7:'',r8:''
  })
 
  const [submited , setSubmited] = useState(false)
  // Capitlize workout type
  const [first, ...rest] = type
  // onCHange
  const handleChange = e =>{
    const {name,value} = e.target
    setValues({
      ...values,[name]:value
    })
  }
  // finish submit
  const onSubmit=e=>{
    e.preventDefault()
    submit()
  }
  
  // submit data to database
  async function submit(){
    let weights =[], reps = []
    Object.entries(values).map(([key, val],i)=>{
      if(key === `w${i+1}`){
        weights.push(val)
      }else{
        reps.push(val)
      }
    })
    
    try{
      const res = await fetch(`/api/trackWorkout/${user_id}`, {
        method: 'POST',
        body: JSON.stringify({date,type,weights,reps,user_id}),
        headers: {'Content-Type':'application/json'}
      })
      if(res.status<200||res.status>299){
        return console.log('process problem')
      }else{
        const body = await res.text()
        const result = JSON.parse(body)
        if(result.status === 'success'){
          return window.location.href = '/trackwo'
        }
      }
    }catch(err){
      console.log('register'+err)
    }
  }

  return (
<>
  <h1>{`${first.toUpperCase()+rest.join('')} :`}</h1>
  <form className='ui form' onSubmit={onSubmit}>
    <table className="ui inverted red celled center aligned small table">
      <thead>
        <tr>
          <th className="left aligned">Sets</th>
          <th>Weight</th>
          <th>Reps</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(sets)].map((_, i)=>{
          return <tr key={i}>
            <td className="left aligned">{i+1}</td>
            <td>
              <input
                className='smallInput'
                type='number'
                name={`w${i+1}`}
                value={values[`w${i+1}`]}
                onChange={handleChange}
                required 
              />
            </td>
            <td>
              <input
                className='smallInput'
                type='number' 
                name={`r${i+1}`} 
                value={values[`r${i+1}`]} 
                onChange={handleChange} 
                required
              />
            </td>
          </tr>
        })}
      </tbody>
    </table>
    <button className='ui green inverted button' type='submit'>Submit</button>
  </form>
</>
  )
}

export default TrackWorkOut