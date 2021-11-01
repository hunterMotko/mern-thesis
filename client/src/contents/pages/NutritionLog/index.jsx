import React, {useState, useEffect,useContext} from 'react'
import InputField from '../Helpers/InputField'
import useForm from '../Helpers/useForm'
import validateLog from './validateLog'
import validateUpdate from './validateUpdate'
import UserContext from '../../../App/UserContext';
import {
  meat,
  beansLentilsPeas,
  breadsGrains,
  cerealsBreakfast,
  dairy,
  fruitsVeggies
} from './foods'

const NutritionLog=({toggle,setToggle})=>{
  const [done, setDone] =useState(false)
  const [daily, setDaily] = useState([])
  const [data, setData] = useState([])
  const [target, setTarget]= useState({})
  const {username, user_id}=useContext(UserContext)

  const loadData = async() =>{
    try{
      const res = await fetch(`/api/logNutrition/${user_id}`)
      if(res.status<200||res.status>299){
        console.log('resErr')
      }else{
        const body = await res.text()
        const result = JSON.parse(body)
        setData(result.data)
      }
    }catch(err){
      console.log('catchError', err)
    }
  }
  const loadtarget =async()=>{
    try{
      const res = await fetch(`/api/nutrition/${user_id}`)
      if(res.status<200||res.status>299){
        console.log('resErr')
      }else{
        const body = await res.text()
        const result = JSON.parse(body)
        setTarget(result.data[0])
      }
    }catch(err){
      console.log('catchError', err)
    }
  }
  useEffect(()=>{
    if(user_id){
      loadData()
      loadtarget()
    }
  },[user_id])
  
  return (
    <div className={`nutritionlog ui center aligned container`}>
      <div className="ui raised inverted segment">
        <div className='ui inverted segment'>
          <h1>Nutrition Log</h1>
          <h3>Welcome {username} start tracking your diet here!</h3>
        </div>
        {(target)?
          <ShowTarget target={target}/>
            :<button className='ui inverted green button'
                onClick={()=>window.location.href='/nutrition'}
              >Make your daily target</button>
        }
        {(data.length>0)?
          <ShowLogData data={data}/>
          : <></>
        }
        {(done)? 
          <CalcDaily 
            user_id={user_id} 
            daily={daily} 
            setDone={setDone}/>
            :<DailyNutrition
              daily={daily} 
              setDaily={setDaily} 
              toggle={toggle}
              setToggle={setToggle}
              setDone={setDone}/>
        }
      </div>
    </div>
  )
}

const ShowLogData =({data})=>{
  const [update, setUpdate]=useState(false)
  const [idx, setIdx]=useState(0)

  const handleDelete=async obj=>{
    console.log(obj)
    const {log_id, user_id} = obj
    try{
      const res = await fetch(`/api/logNutrition/delete/${log_id}/${user_id}`,{method:'DELETE'})
      if(res<200||res>299){
        console.log('resErr')
      }else{
        const body = await res.json()
        if(body.status==='deleted'){
          window.location.href='/lognutrition'
        }
      }
    }catch(err){console.log('catchErr')}
  }

  const handleUpdate = (i)=>{
    setIdx(i)
    setUpdate(true)
  }

  return(
    <>
  {(update)?
    <UpdateLogData 
      data={data} 
      idx={idx} 
      setUpdate={setUpdate}
    /> :
    <div className="ui centered inverted celled grid">
      <h1>Daily Log Information</h1> 
      <div className="row">
        <div className="two wide column">Date</div>
        <div className="two wide column">Calories</div>
        <div className="two wide column">Protein</div>
        <div className="two wide column">Carbs</div>
        <div className="two wide column">Fat</div>
        <div className="two wide column">Action</div>
      </div>
      {data.map((item, i)=>
        <div className="two column row" key={i}>
          <div className="two wide column">{item.date.slice(0,10)}</div>
          <div className="two wide column">{item.calories}</div>
          <div className="two wide column">{item.protein}</div>
          <div className="two wide column">{item.carbs}</div>
          <div className="two wide column">{item.fat}</div>
          <div className="two wide column">
            <div className='ui buttons'>
              <div className="ui inverted green icon button"
                onClick={()=>handleUpdate(i)}>
                <i className='list icon'></i>
              </div>
              <div className="ui inverted red icon button" onClick={()=>handleDelete(item)}>
                <i className='remove icon'></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    }
    </>
  )
} 

const UpdateLogData = ({data,idx,setUpdate})=>{
  const{log_id,user_id,date,calories,protein,carbs,fat}=data[idx]
  const [values, setValues]=useState({date:date.slice(0,10),calories,protein,carbs,fat})
  const {handleChange, handleSubmit, errors} = useForm(values, setValues, update, validateUpdate)

  async function update(){
    const {date,calories,protein,carbs,fat}=values
    try{
      const res = await fetch(`/api/logNutrition/update/${log_id}/${user_id}`,{
        method:'POST',
        body:JSON.stringify({date,calories,protein,carbs,fat}),
        headers:{'Content-Type':'application/json'}
      })
      if(res<200||res>299){
        console.log('resErr')
      }else{
        const body = await res.json()
        if(body.status==='updated'){
          window.location.href='/lognutrition'
        }
      }
    }catch(err){console.log('catchErr',err)}
  }

  return(
    <form className='ui form' onSubmit={handleSubmit}>
      <div className="ui one column center aligned celled grid">
        <div className="row">
          <div className="eight wide column">
            <InputField
              type="date"
              name="date" 
              value={values.date} 
              change={handleChange}
              error={errors.date} />
          </div>          
        </div>
        <div className="row">
          <div className="eight wide column">
            <InputField
              type='number'
              name='calories'
              value={values.calories}
              change={handleChange}
              error={errors.calories}/>
          </div>          
        </div>
        <div className="row">
          <div className="eight wide column">
            <InputField
                type='number'
                name='protein'
                value={values.protein}
                change={handleChange}
                error={errors.protein}/>
          </div>          
        </div>
        <div className="row">
          <div className="eight wide column">
            <InputField
              type='number'
              name='carbs'
              value={values.carbs}
              change={handleChange}
              error={errors.carbs}/>
          </div>          
        </div>
        <div className="row">
          <div className="eight wide column">
            <InputField
              type='number'
              name='fat'
              value={values.fat}
              change={handleChange}
              error={errors.fat}/>
          </div>          
        </div>
      </div>
      <button className='ui inverted green button'>Update</button>
      <button className='ui inverted red button'
        onClick={()=>setUpdate(false)}
      >Cancel</button>

    </form>
  )
}

const ShowTarget = ({target})=>{
  
  return(
    <div className="ui celled center aligned grid">
      <h1>Your Daily Target Goal</h1>
      <div className="row">
        <div className="four wide column">Calories</div>
        <div className="four wide column">Protein</div>
        <div className="four wide column">Carbs</div>
        <div className="four wide column">Fat</div>
      </div>
      {
        <div className="row">
          <div className="four wide column">{target.calories}</div>
          <div className="four wide column">{target.protein}</div>
          <div className="four wide column">{target.carbs}</div>
          <div className="four wide column">{target.fat}</div>
        </div>
      }
    </div>
  )
}
const DailyNutrition=({daily,toggle,setToggle,setDaily,setDone})=>{
  const [other, setOther] =useState(false)
  const [arr, setArr]=useState([])

  const modalClick=e=>{
    switch(e.currentTarget.id){
      case 'meat':
        setArr(meat);
        break;
      case 'beans':
        setArr(beansLentilsPeas);
        break;
      case 'breads':
        setArr(breadsGrains);
        break;
      case 'cereals':
        setArr(cerealsBreakfast);
        break;
      case 'fruits':
        setArr(fruitsVeggies);
        break;
      case 'dairy':
        setArr(dairy);
        break;
    }
    setToggle(true)
  }

  const handleRemove = i =>{
    setDaily((prevState)=>{
      const newArr = [...prevState]
      newArr.splice(i,1)
      return newArr
    })
  }

  const makeContent = daily.map((d,i)=>
    <ShowDaily key={i}
     food={d.food}
     serving={d.serving}
     calories={d.calories}
     protein={d.protein}
     carbs={d.carbs}
     fat={d.fat}
     remove={handleRemove}
     i={i}
    />)
  
  return(
  <>
    <div className="ui horizontal inverted section divider">
      Click to add an item to your Nutrition Log
    </div>
    <div className="ui buttons">
      <div className="ui inverted red button" id='meat'
        onClick={modalClick}>Meat</div>
      <div className="ui inverted red button" id='breads'
        onClick={modalClick}>Bread/Grains</div>
      <div className="ui inverted red button" id='beans'
        onClick={modalClick}>Beans</div>
    </div>
    <div className="ui buttons">
        <div className="ui inverted red button" id='cereals'
        onClick={modalClick}>Cereals</div>
        <div className="ui inverted red button" id='fruits'
        onClick={modalClick}>Fruits</div>
        <div className="ui inverted red button" id='dairy'
        onClick={modalClick}>Dairy</div>
    </div>
    { other ? 
      <>
      <div className="ui inverted horizontal section divider">
        Add Other Food Items here
      </div>
      <NutritionForm daily={daily} setDaily={setDaily} setOther={setOther}/>
      </>
    : <button className='ui inverted red button' onClick={()=>setOther(true)}>Add Other<i className='right arrow icon'></i></button>
    }
    {
      (daily.length>0)?
      <>
        <div className="ui center aligned stackable celled color grid">
          <h1>Daily Consumption</h1>
          <div className="seven column row">
            <div className="column">
              <div><b>Food</b></div>
            </div>
            <div className="column">
              <div><b>Serving</b></div>
            </div>
            <div className="column">
              <div><b>Calories</b></div>
            </div>
            <div className="column">
              <div><b>Protein</b></div>
            </div>
            <div className="column">
              <div><b>Carbs</b></div>
            </div>
            <div className="column">
              <div><b>Fat</b></div>
            </div>
            <div className="column">
              <div><b>Remove</b></div>
            </div>
          </div>
          {makeContent}
        </div>
        
      <div className="ui inverted horizontal section divider">
        Total Daily Intake
      </div>
      <button className='ui blue inverted button'
        onClick={()=>setDone(true)}>
          Calculate
      </button>
    </>
    :<></>
    }
    <Modal 
      arr={arr}
      toggle={toggle} 
      setToggle={setToggle} 
      daily={daily}
      setDaily={setDaily}
    />
  </>
  )
}

const CalcDaily=({user_id,daily, setDone})=>{
  const [totals, setTotals] =useState({})
  const [calculated, setCalculated]=useState(false)
  const [value, setValue]=useState({date:''})
  const handleChange =e=>{
    const {name, value} = e.target
    setValue({[name]:value})
  }

  useEffect(()=>{
    calculate(daily)
  },[])

  function calculate(daily){
    let calories=0,protein=0,carbs=0,fat=0
    daily.map(item=>{
      calories += parseInt(item.calories)
      protein += parseInt(item.protein)
      carbs += parseInt(item.carbs)
      fat += parseInt(item.fat)
    })
    setTotals({calories,protein,carbs,fat})
    setCalculated(true)
  }
  async function submit(){
    const {date}=value
    const {calories,protein,carbs,fat}=totals
    try{
      const res = await fetch(`/api/logNutrition/${user_id}`,{
        method:'POST',
        body: JSON.stringify({date,calories,protein,carbs,fat}),
        headers: {'Content-Type':'application/json'}
      })
      if(res<200||res>299){
        console.log('resErr')
      }else{
        const body = await res.json()
        if(body.status === 'created'){
          window.location.href = '/lognutrition'
        }
      }
    }catch(err){console.log('submitCatchErr', err)}
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
      if(value.date.length>8){
        submit()
      }
  }

  return(
  <>
    <div className='ui center aligned celled stackable grid'>
      <h1>Daily Consumption Total</h1>
      <div className="row">
        <div className="four wide column">
          Date
        </div>
        <div className="three wide column">
          Calories
        </div>
        <div className="three wide column">
          Protein
        </div>
        <div className="three wide column">
          Carbs
        </div>
        <div className="three wide column">
          Fat
        </div>
      </div>
    {(calculated)? 
        <div className="row">
          <div className="four wide column">
            <input type="date"
             name="date" 
             value={value.date} 
             onChange={handleChange}/>
          </div>
          <div className="three wide column">
            {totals.calories}
          </div>
          <div className="three wide column">
            {totals.protein}
          </div>
          <div className="three wide column">
            {totals.carbs}
          </div>
          <div className="three wide column">
            {totals.fat}
          </div>
        </div>
      : <div>OOOPPS</div>
    }
    </div>
    <button className='ui inverted large green button'
      onClick={handleSubmit}
    >Save</button>
    <button className='ui inverted large red button'
      onClick={()=>setDone(false)}
    >Redo</button>
  </>
  )
}

const ShowDaily =({food,serving,calories,protein,carbs,fat,remove,i})=>{
  const onRemove=e=>{
    e.preventDefault()
    remove(i)
  }
  return(
  <div className="seven column blue row">
    <div className="column">
      <div className="">{food}</div>
    </div>
    <div className="column">
      <div className="">{serving}</div>
    </div>
    <div className="column">
      <div className="">{calories}</div>
    </div>
    <div className="column">
      <div className="">{protein}</div>
    </div>
    <div className="column">
      <div className="">{carbs}</div>
    </div>
    <div className="column">
      <div className="">{fat}</div>
    </div>
    <div className="column">
      <button className='ui red inverted button' onClick={onRemove}><i className='close icon'></i></button>
    </div>
  </div>
  )
}

const NutritionForm=({ daily, setDaily, setOther})=>{
  // control components
  const [values, setValues] = useState(
    {food:'',serving:'',calories:'',protein:'',carbs:'',fat:''}
    )
  // form helper function
  const {handleChange, handleSubmit, errors} = useForm(values, setValues, submit, validateLog)

  function submit(){
    setDaily([...daily, values])
    setValues({food:'',serving:'',calories:'',protein:'',carbs:'',fat:''})
    setOther(false)
  }

  return(
  <form className='ui form' onSubmit={handleSubmit}>
    <div className="six fields">
      <InputField 
        type='text'
        name='food'
        value={values.food}
        error={errors.food}
        change={handleChange}
      /> 
      <InputField
        type='text'
        name='serving'
        value={values.serving}
        error={errors.serving}
        change={handleChange}/>
      <InputField 
        type='number'
        name='calories'
        value={values.calories}
        error={errors.calories}
        change={handleChange}/>
      <InputField
        type='number'
        name='protein'
        value={values.protein}
        error={errors.protein}
        change={handleChange}/>
      <InputField
        type='number'
        name='carbs'
        value={values.carbs}
        error={errors.carbs}
        change={handleChange}/>
      <InputField
        type='number'
        name='fat'
        value={values.fat}
        error={errors.fat}
        change={handleChange}/>
    </div>
    <button className='ui inverted green button'>Submit</button>
    <button className='ui inverted red button'
      onClick={()=>setOther(false)}
    >Close</button>
  </form>

  )
}

const Modal =({arr,toggle, setToggle, daily,setDaily})=>{
  const [food, setFood] =useState('')

  return(
<div className={
  `ui dimmer modals page transition ${(toggle)?'visible active':'hidden'}`}
>
  <div className={
  `ui standard demo modal scrolling transition ${(toggle)?'visible active':'hidden'}`}
  >
    <i className="close icon" onClick={()=>setToggle(false)}></i>
    <div className="header">
      Nutrition Info
    </div>
    <div className="content">
      <div className="description">
        <div className="ui header">
          Click a food to add to daily meal
        </div>
        <div className="ui centered divided color grid">
          <div className='black row'>
            <div className='three wide column'><b>Source</b></div>
            <div className='three wide column'><b>Serving</b></div>
            <div className='two wide column'><b>Calories</b></div>
            <div className='two wide column'><b>Protein</b></div>
            <div className='two wide column'><b>Carbs</b></div>
            <div className='two wide column'><b>Fat</b></div>
          </div>
          {arr.map((x, i)=>
            <div key={i}
              id={x.food}
              className={`${x.food===food?'red':'blue'} row`}
              onMouseEnter={(e)=>setFood(e.currentTarget.id)}
              onMouseLeave={()=>setFood('')}
              onClick={()=>{setDaily([...daily,x]);setToggle(false)}}
            >
              <div className='three wide column'>{x.food}</div>
              <div className='three wide column'>{x.serving}</div>
              <div className='two wide column'>{x.calories}</div>
              <div className='two wide column'>{x.protein}</div>
              <div className='two wide column'>{x.carbs}</div>
              <div className='two wide column'>{x.fat}</div>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="actions" >
      <div className="ui red right labeled icon button"
        onClick={()=>setToggle(false)}>
          Close
          <i className="close icon"></i>
      </div>
    </div>
  </div>
</div>
  )
}
export default NutritionLog