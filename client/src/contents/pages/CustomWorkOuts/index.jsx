import React, {useState,useEffect, useContext} from 'react'
import {
  Legs,Chest,Back,Shoulders,Biceps,Triceps,Calves,Abs
} from './Workouts/Workouts'
import UserContext from '../../../App/UserContext'
import useForm from '../Helpers/useForm'
import InputField from '../Helpers/InputField'
import validate from './validateCWO'

// table helper
const BuildDaysTable=({children})=>
<table className='ui right aligned table'>
  <thead>
    <tr>
      <th>Sets</th>
      <th>Reps</th>
      <th>Workout</th>
      <th>weight</th>
    </tr>
  </thead>
  <tbody>
    {children}
  </tbody>
</table>

// three workout days
const ThreeDays=({obj})=>{
  const {bench,squat,deadlift,clean}=obj
  return(
<div className='ui one column center aligned grid'>
    <div className="column">
      <h1>Monday: Legs & Abs</h1>
      <BuildDaysTable>
          <Legs squat={squat}/>
          <Calves/>
          <Abs/>
      </BuildDaysTable>
    </div>
    <div className="column">
      <h1>Wednesday: Chest & Back</h1>
      <BuildDaysTable>
        <Chest bench={bench}/>
        <Back deadlift={deadlift}/>
      </BuildDaysTable>
    </div>
    <div className="column">
      <h1>Friday: Shoulders & Arms</h1>
      <BuildDaysTable>
        <Shoulders clean={clean}/>
        <Triceps/>
        <Biceps/>
      </BuildDaysTable>
    </div>
  </div>
  )
}

// four workout days
const FourDays=({obj})=>{
  const {bench,squat,deadlift,clean}=obj
  return(
  <div className='ui one column center aligned grid'>
    <div className="column">
      <h1>Monday: Legs & Calves</h1>
      <BuildDaysTable>
        <Legs squat={squat}/>
        <Calves/>
      </BuildDaysTable>
    </div>
    <div className="column">
      <h1>Tuesday: Chest & Triceps</h1>
      <BuildDaysTable>
        <Chest bench={bench}/>
        <Triceps/>
      </BuildDaysTable>
    </div>
    <div className="column">
      <h1>Thursday: Back & Biceps</h1>
      <BuildDaysTable>
        <Back deadlift={deadlift}/>
        <Biceps/>
      </BuildDaysTable>
    </div>
    <div className="column">
      <h1>Friday: Shoulders & Abs</h1>
      <BuildDaysTable>
        <Shoulders clean={clean}/>
      </BuildDaysTable>
    </div>
  </div>
  )
}

// five workout days
const FiveDays=({obj})=>{
  // access values 
  const {bench,squat,deadlift,clean}=obj
  return(
  <div className='ui one column center aligned grid'>
    <div className="column">
      <h1>Monday: Legs & Calves</h1>
      <BuildDaysTable>
        <Legs squat={squat}/>
        <Calves/>
      </BuildDaysTable>
    </div>
    <div className="column">
      <h1>Tuesday: Chest & Triceps</h1>
      <BuildDaysTable>
        <Chest bench={bench}/>
        <Triceps/>
      </BuildDaysTable>
    </div>
    <div className="column">
      <h1>Wensday: Back & Biceps</h1>
      <BuildDaysTable>
        <Back deadlift={deadlift}/>
        <Biceps/>
      </BuildDaysTable>
    </div>
    <div className="column">
      <h1>Friday: Shoulders&Triceps</h1>
      <BuildDaysTable>
        <Shoulders clean={clean}/>
        <Triceps/>
      </BuildDaysTable>
    </div>
    <div className="column">
      <h1>Saturday: Abs&Biceps</h1>
      <BuildDaysTable>
        <Abs/>
        <Biceps/>
      </BuildDaysTable>
    </div>
  </div>
  )
}

// make the 1RM into working ranges
const Calc = ({values,onerep, handleDelete})=>{
  // calculate into percentanges of 1RepMax
  let oneReps ={perc:[],bench:[],squat:[],deadlift:[],clean:[]}
  // calculate for users one rep max
  for(let i = 50; i <= 100; i+=5){
    oneReps.bench.push((Math.round((Math.round(((i/100)*values.bench)))/5)*5))
    oneReps.squat.push((Math.round((Math.round(((i/100)*values.squat)))/5)*5))
    oneReps.deadlift.push((Math.round((Math.round(((i/100)*values.deadlift)))/5)*5))
    oneReps.clean.push((Math.round((Math.round(((i/100)*values.clean)))/5)*5))
    oneReps.perc.push(i)
  }
  
  return(
  <div className='ui text container'>
    <h2>{values.name}'s Custom Workout </h2>
    <table className="ui inverted celled tiny table">
      <thead>
        <tr>
          <th>% 1RM</th>
          {oneReps.perc.map((item, i)=>
           <th key={i}>{item}</th>
          )}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bench: </td>
          {oneReps.bench.map((item, i)=>
            <td id={i} key={i}>{item}</td>)}
        </tr>
        <tr>
          <td>Squat: </td>
          {oneReps.squat.map((item, i)=>
            <td id={i} key={i}>{item}</td>)}
        </tr>
        <tr>
          <td>DeadLift: </td>
          {oneReps.deadlift.map((item, i)=>
            <td id={i} key={i}>{item}</td>)}
        </tr>
        <tr>
          <td>Clean: </td>
          {oneReps.clean.map((item, i)=>
            <td id={i} key={i}>{item}</td>)}
        </tr>
      </tbody>
    </table>
    <OneRepMax onerep={onerep} handleDelete={handleDelete}/>
    <div className="ui raised segment">
      {(values.days==='3')?
        <ThreeDays obj={oneReps}/>:
          (values.days==='4')?
          <FourDays obj={oneReps}/>:
            <FiveDays obj={oneReps}/>
      }
    </div>
  </div>
  )
}

const Form=({onerep_id,signedIn,user_id,values,setValues,setSubmited})=>{
  // handle form with premade helper form function
  const {handleChange, handleSubmit, errors} = useForm(
    values, setValues,(onerep_id) ? update : submit, validate
    )

  // call back to finish submit
  async function submit(){
    if(signedIn){
      try{
        const res = await fetch('/api/custom',{
          method:'POST',
          body:JSON.stringify({user_id, values}),
          headers: {'Content-Type':'application/json'}
        })
        if(res<200||res>299){
          console.log('queryErr')
        }else{
          const body = await res.text()
          const result = JSON.parse(body)
          const {status} = result
          if(status === 'success'){
            setSubmited(true)
          }
        }
      }catch(err){console.log('catchErr', err)}
    }else{
      setSubmited(true)
    }
  }

  async function update(){
    try{
      const {bench,squat,deadlift,clean}=values
      
      const res = await fetch(`/api/custom/update/${onerep_id}`,{
        method:'POST',
        body: JSON.stringify({bench,squat,deadlift,clean}),
        headers: {'Content-Type':'application/json'}
      })
      if(res<200||res>299){
        console.log('queryErr')
      }else{
        const body = await res.text()
        const result = JSON.parse(body)
        const {status} = result
        if(status === 'updated'){
          window.location.href='/custom'
        }
      }
    }catch(err){console.log('updateCatchErr', err)}
  }

  return(
  <div className="ui text center aligned container">
    <div className="ui form segment">
      <h1>Enter your one rep max:</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          type='text'
          name='name'
          value={values.name}
          error={errors.name}
          change={handleChange}
        />
        <div className="field">
          <label className='ui label'>How many days a week can you work out?</label>
          <select name="days" value={values.days} onChange={handleChange}>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <InputField
          type='number'
          name='bench'
          value={values.bench}
          error={errors.bench}
          change={handleChange}
        />
        <InputField
          type='number'
          name='squat'
          value={values.squat}
          error={errors.squat}
          change={handleChange}
        />
        <InputField
          type='number'
          name='deadlift'
          value={values.deadlift}
          error={errors.deadlift}
          change={handleChange}
        />
        <InputField
          type='number'
          name='clean'
          value={values.clean}
          error={errors.clean}
          change={handleChange}
        />
        <button className='ui red button' type="submit">Submit</button>
      </form>
    </div>
  </div>
  )
}

const Question=({onerep, handleDelete})=>{
  const {signedIn, username, user_id} = useContext(UserContext)
  const [submited, setSubmited] = useState(false)
  // controlled component values
  const [values, setValues] = useState({
    name:(signedIn) ? username : '', 
    bench:(onerep.bench) ? onerep.bench : '', 
    squat:(onerep.squat) ? onerep.squat : '', 
    deadlift:(onerep.deadlift) ? onerep.deadlift : '', 
    clean:(onerep.clean) ? onerep.clean : '',
    days:'3'
  })
  return(
  <div className="ui container">
  {(submited||onerep.onerep_id)?
    <Calc values={values} onerep={onerep} handleDelete={handleDelete}/> :
      <Form 
        onerep_id={(onerep)?onerep.onerep_id:''}
        signedIn={signedIn}
        user_id={user_id}
        values={values}
        setValues={setValues}
        submited={submited}
        setSubmited={setSubmited}
      />
    }
  </div>
  )
}

const CustomWorkOuts =()=>{
  const [question, setQuestion] = useState(true)
  const {signedIn, user_id} = useContext(UserContext)
  const [onerep, setOnerep]=useState({})
  
  const getData =async()=>{
    try{
      const res = await fetch(`/api/custom/${user_id}`)
      if(res<200||res>299){
        console.log('fetchErr')
      }else{
        const body = await res.json()
        if(body.data.length>0){
          setOnerep(body.data[0])
        }
      }
    }catch(err){
      console.log('catchError', err)
    }
  }

  const handleDelete = async ()=>{
    try{
      const res = await fetch(`/api/custom/delete/${onerep.onerep_id}`,{method:'DELETE'})
      if(res<200||res>299){
        console.log('fetchErr')
      }else{
        const body = await res.text()
        const result = JSON.parse(body)
        if(result.status==='deleted'){
          window.location.href='/custom'
        }
      }
    }catch(err){console.log('catchErr'+err)}
  }

  useEffect(()=>{
    if(signedIn)getData()
  },[signedIn])

  
  return(
  <div className="customworkout">
    <div className="ui center aligned container">
      {(question&&!onerep.onerep_id)?
        <InitInfo setQuestion={setQuestion}/>
        :<Question onerep={onerep} handleDelete={handleDelete}/>
      }
    </div>
  </div>
  )
}

const OneRepMax =({onerep, handleDelete})=>
<div className="ui inverted segment">
          <h1>One Rep Max</h1>
          <div className='ui celled center aligned grid'>
            <div className="row">
              <div className='four wide column'>Bench</div>
              <div className='four wide column'>Squat</div>
              <div className='four wide column'>Deadlift</div>
              <div className='four wide column'>Clean</div>
            </div>
            <div className="row">
              <div className='four wide column'>{onerep.bench}</div>
              <div className='four wide column'>{onerep.squat}</div>
              <div className='four wide column'>{onerep.deadlift}</div>
              <div className='four wide column'>{onerep.clean}</div>
            </div>
          </div>
          <button className='ui inverted green button'
              onClick={()=>setQuestion(false)}
            >Update</button>
          <button className='ui inverted red button'
              onClick={handleDelete}
            >Delete</button>
        </div>

const InitInfo = ({setQuestion})=>
<div className='ui text container'>
  <div className='ui raised inverted segment'>
    <h1>Create Your Own Customized Workouts</h1>
    <h2>Although, there are general facts to follow:</h2>
    <ul>
      <li>Working out in 80 - 95 percent of you 1rm helps muscle growth.</li>
      <li>Working two body parts each work out helps overall performance.</li>
      <li>Increasing weight from week to week helps stop plateauing.</li>
      <li>Recording your work outs helps you know when to increase of decrease your percentage</li>
    </ul>
    <button className='ui huge red button' onClick={()=>setQuestion(false)}>Start<i className='right arrow icon'></i></button>
  
  </div>
</div>

export default CustomWorkOuts