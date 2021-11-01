import React from 'react'
import { Link } from 'react-router-dom'

const SideBarMenu=({user, active, setActive})=>{
  const clickAct =()=>setActive(false)
  return(
  <div 
    className={
    `ui vertical inverted sidebar menu left ${(active)?'uncover visible':''}`}
  >
    <Link to='/' className="item" onClick={clickAct}>
      Home
    </Link>
    <Link to="/about" className="item" onClick={clickAct}>
      About
    </Link>
    
    {(user.signedIn)?
      <>
        <Link to="/custom" className="item" onClick={clickAct}>
          Custom Work Out
        </Link>
        <Link to="/trackwo" className="item" onClick={clickAct}>
          Track Work Out
        </Link>
        <Link to="/nutrition" className="item" onClick={clickAct}>
          Nutrition
        </Link>
        <Link to="/lognutrition" className="item" onClick={clickAct}>
          Nutrition Log
        </Link>
      </> : 
      <>
      <Link to="/custom" className="item" onClick={clickAct}>
        Custom Work Out
      </Link>
      <Link to="/nutrition" className="item" onClick={clickAct}>
        Nutrition
      </Link>
      </>
    }
  </div>
  )
}

export default SideBarMenu