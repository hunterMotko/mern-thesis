import React, {useState,useEffect} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from '../contents/pages/Home'
import About from '../contents/pages/About'
import NotFound from '../contents/pages/NotFound'
import CustomWorkOuts from '../contents/pages/CustomWorkOuts'
import Nutrition from '../contents/pages/Nutrition'
import NutritionLog from '../contents/pages/NutritionLog'
import NavBar from '../contents/NavBar'
import Footer from '../contents/Footer'
import Register from '../contents/pages/Register'
import Login from '../contents/pages/Login'
import TrackWorkOut from '../contents/pages/TrackWorkOut'
import UserContext from './UserContext'
import SideBarMenu from '../contents/SideBarMenu'

const App=()=> {
  const [user, setUser] = useState({})
  const [active, setActive]=useState(null)
  const [toggle, setToggle] = useState(false)

  // handle user state
  const onUserChange =(user)=>{
    setUser(user)
  }

  // set user if there is one
  const loadUser = async()=>{
    try{
      const res = await fetch('/api/user',{method:'POST',credentials:'include'})
      const body = await res.text()
      const result = JSON.parse(body)
      const {signedIn, user_id, username} = result
      if(signedIn){
        onUserChange({signedIn,user_id,username})
      }
    }catch(err){
      console.log('catchError', err)
    }
  }

  // component did mount
  useEffect(()=>{
    loadUser()
  }, [])

  // close sidebar menu if window is to big
  window.addEventListener('resize', ()=>{
    if(window.innerWidth>767){ return setActive(false)}
  })
  
  // manage routes
  return(
  <Router>
    {active?
      <SideBarMenu user={user} active={active} setActive={setActive}/>
        :<></>
    }
    <div className="pusher">
      <div className={`ui pushable dimmable scrolling ${(toggle)?'dimmed':''}`}>
        <NavBar user={user} onUserChange={onUserChange} active={active} setActive={setActive}/>
        <UserContext.Provider value={user}>
          <Switch>
            <Route path="/" exact>
              <Home/>
            </Route>
            <Route path="/about" exact>
              <About/>
            </Route>
            <Route path="/custom" exact>
              <CustomWorkOuts/>
            </Route>
            <Route path="/nutrition" exact>
              <Nutrition/>
            </Route>
            <Route path="/register" exact>
              <Register/>
            </Route>
            <Route path="/login" exact>
              <Login user={user} onUserChange={onUserChange}/>
            </Route>
            <Route path="/trackwo" exact>
              <TrackWorkOut/>
            </Route>
            <Route path="/lognutrition" exact>
              <NutritionLog toggle={toggle} setToggle={setToggle}/>
            </Route>
            <Route><NotFound/></Route>
          </Switch>
        </UserContext.Provider>
        <Footer/>
      </div>
    </div>
  </Router>
  )
}

export default App