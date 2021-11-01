import React, { useState , useEffect,useContext}from 'react'
import veggies from '../../images/veggies.jpeg'
import cows from '../../images/cows.jpeg'
import InputField from '../Helpers/InputField'
import useForm from '../Helpers/useForm'
import validate from './validateNut'
import UserContext from '../../../App/UserContext'

const Nutrition = ()=>{
  const [toggle, setToggle]=useState(true)
  const [target, setTarget]=useState({})
  const {user_id,username,signedIn}= useContext(UserContext)
  
  const getNutData =async()=>{
    try{
      const res = await fetch(`/api/nutrition/${user_id}`)
      if(res<200||res>299){
        console.log('fetchErr')
      }else{
        const body = await res.json()
        if(body.data.length>0){
          const {calories, protein, carbs, fat}=body.data[0]
          setTarget({calories, protein, carbs, fat})
        }
      }
    }catch(err){
      console.log('catchError', err)
    }
  }

  useEffect(()=>{
    if(signedIn){
      getNutData()
    }
  },[signedIn])
  
  return(
    <div className='nutrition'>
      {(target&&toggle&&signedIn)? 
        (target.calories)?
          <div className='ui raised inverted center aligned segment'>
            <h1>Nutrition Target</h1>
            <ShowDiet signedIn={signedIn} user_id={user_id} name={username} nut={target}/>
          </div>:
            <div className='ui raised inverted center aligned segment'>
              <h1>Sorry {username} you have no data</h1>
              <div className="ui inverted red button" onClick={()=>setToggle(false)}>Click to add Nutrition Target</div>
            </div>:
          (toggle)?  <Info setToggle={setToggle}/>:<DietPlan signedIn={signedIn} user_id={user_id} username={username}/>
      }
    </div>
  )
}

const Info =({setToggle})=>
  <div className='ui text container'>
    <div className="ui raised center aligned inverted segment">
      <h1>Learn how important your nutrition really is.</h1>
    </div>
    <div className="ui two column stackable grid container">
      <div className="column">
        <div className="ui inverted segment">
          <h3>Nutrition Facts</h3>
          <ul>
            <li>
              Nutrition is the science that interprets the interaction of nutrients and other substances in food in relation to maintenance, growth, reproduction, health and disease of an organism. It includes food intake, absorption, assimilation, biosynthesis, catabolism and excretion.
            </li>
            <li>
              Nutrients can be broken down into two categories: Macronurtients and Micronutrients
            </li>
            <li>Macronurtients: Carbohydrates, Fiber, Fat, Fatty Acids, Protien, Water</li>
            <li>
              Micronutrients: Minerals, Vitamins
            </li>
          </ul>
        </div>
      </div>
      <div className="column">
        <div className="ui inverted segment">
          <img src={veggies} className='ui image' alt="veggies"/>
        </div>
      </div>
      <div className="column">
        <div className="ui inverted segment">
        <img src={cows} className='ui image' alt="veggies"/>
        </div>
      </div>
      <div className="column">
        <div className="ui inverted segment">
          <h3>Why is all this important to you?</h3>
          <ul>
            <li>Having a healthy diet and eating good foods wont only make you feel better, it will give you more energy and potentially extend your life.</li>
            <li>Diet is important to working out as well. A healthy diet can increase your results by 60 percent.</li>
            <li>This is reached by the extra energy your body produces to make you workout longer, lift more, and speed up recovery time.</li>
          </ul>
        </div>
      </div>
      <div className="column">
        <div className="ui inverted segment">
          <h3>Dont know where to start?</h3>
          <p>There are many different opinons on how to diet. How do you know which is best for you? How do you plan this around your workouts? There are many different variables when it comes to knowing where to start.</p>
        </div>
      </div>
      <div className="column">
        <div className="ui inverted segment">
            <h3>First ask your self: </h3>
            <ul>
              <li>Am i trying to gain weight?</li>
              <li>Lose weight?</li>
              <li>Maintain and just get healthier?</li>
            </ul>
        </div>
      </div>
    </div>
    <div className="ui raised center aligned inverted segment">
      <h2>We have made the process a little easier for you.</h2>
      <button className='ui red button' onClick={()=>setToggle(false)}>Start Now</button>
    </div>
  </div>

const DietPlan =({user_id, username, signedIn})=>{
  const [nut, setNut]=useState({})
  const [values, setValues] = useState({
    name:(signedIn)?username:'', weight:'', bodyfat:'',weightgoal:''
  })
  const [done, setDone] = useState(false)
  
  return(
  <div className='dietplan'>
    {(done)?
      <ShowDiet 
        signedIn={signedIn}
        user_id={signedIn?user_id:''} 
        name={values.name} 
        nut={nut}
      />
        :<DietForm
          user_id={user_id}
          signedIn={signedIn}
          nut={nut}
          setNut={setNut}
          values={values}
          setValues={setValues}
          setDone={setDone}
        />
    }
  </div>
  )
}

const DietForm=({user_id,values,signedIn,setValues,setDone,setNut})=>{
  const {handleChange, handleSubmit, errors} = useForm(values, setValues, submit, validate)
  
  const calculateDiet = obj =>{
    const {weight, bodyfat, weightgoal}=obj
    let lbm = ((1-(parseInt(bodyfat)/100))*parseInt(weight))/2.2
    let bmr = Math.round(130 +(21.6*lbm))
    let adjust 
    (weightgoal==='lose')? adjust = 1.2:
      (weightgoal==='gain')? adjust = 1.5: adjust=1.35
    setNut({
      calories: Math.round(bmr*adjust), 
      protein: Math.round((bmr*.4)/4),
      carbs: Math.round((bmr*.3)/4), 
      fat: Math.round((bmr*.3)/9)
    })
    return {
      calories: Math.round(bmr*adjust), 
      protein: Math.round((bmr*.4)/4),
      carbs: Math.round((bmr*.3)/4), 
      fat: Math.round((bmr*.3)/9)
    }
  }

  async function submit(){
    
    let val = calculateDiet(values)
    if(signedIn){
      try{
        const res = await fetch(`/api/nutrition`,{
          method:'POST',
          body: JSON.stringify({user_id,val}),
          headers:{'Content-Type':'application/json'}
        })
        if(res<200||res>299){
          console.log('fetchErr')
        }else{
          const body = await res.json()
          if(body.status==='success'){
            setDone(true)
          }
        }
      }catch(err){console.log('catchErr'+err)}
    }else{
      setDone(true)
    }
    
  }

  return(
  <div className="ui text center aligned container">
    <h1 className='ui segment'>Please input your name, weight, body fat percentage, and what goal you are trying to obtain.</h1>
    <form className='ui form' onSubmit={handleSubmit}>
      <InputField
        type='text'
        name='name'
        value={values.name}
        error={errors.name}
        change={handleChange}
        />
      <InputField 
        type='number'
        name='weight'
        value={values.weight}
        error={errors.weight}
        change={handleChange}
        />
      <InputField
        type='number'
        name='bodyfat'
        value={values.bodyfat}
        error={errors.bodyfat}
        change={handleChange}
        />
        <div className="field">
          <label className='ui label'>Pick a weight goal</label>
          <select
            className={`${errors.weightgoal&&'inputError'}`}
            name="weightgoal" 
            value={values.weightgoal} 
            onChange={handleChange}>
            <option value="">Choose One</option>
            <option value="gain">Gain Weight</option>
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
          </select>
          {errors.weightgoal && <p className="error">{errors.weightgoal}</p>}
        </div>
        <button className='ui green button'>Submit</button>
    </form>
  </div>
  )
}

const ShowDiet =({signedIn,user_id,name,nut})=>{
  
  const handleDelete = async()=>{
    try{
      const res = await fetch(`/api/nutrition/delete/${user_id}`,{method:'DELETE'})
      if(res<200||res>299){
        console.log('resErr')
      }else{
        window.location.href='/nutrition'
      }
    }catch(err){console.log('catchErr'+err)}
  }
  
  return(
    <div className="ui center aligned text container">
      <div className='ui raised inverted segment'>
        <h1>{name} you should eat </h1>
        <div className='ui center aligned celled grid'>
          <div className="row">
            <div className="six wide column">Type</div>
            <div className="six wide column">Amount</div>
          </div>
          {Object.entries(nut).map(
            ([key,value],i)=>
              <div className='row' key={i}>
                <div className="six wide column">{key}</div>
                <div className="six wide column">{value}{(key!=='calories')?' grams':''}</div>
              </div>
            )}
        </div>
        <h1>per day</h1>
      </div>
      {(signedIn)?
        <button className="ui inverted red button" onClick={handleDelete}>Delete</button>
        :
        <></>
      }
    </div>
  )
}

export default Nutrition