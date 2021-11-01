import React from 'react'
import { Link } from 'react-router-dom'


// navbar for all pages
const NavBar = ({user, onUserChange ,active, setActive}) =>{
  
  // logout user 
  const logout = async()=>{
    try{
      const res = await fetch(`/api/logout/${user.user_id}`,{
        method:'POST',
        credentials:'include'
      })
      if(res.status<200||res.status>299){
        return console.log('process problem')
      }else{
        const body = await res.json()
        if(body){
          const {signedIn, username, user_id} = body
          onUserChange({signedIn, username, user_id,onerep_id:'',target_id:''})
          window.location.href='/'
        }
      }
    }catch (err){
      console.log('logout err'+err)
    }
  }
  
  return(
  <div className="ui small secondary inverted red pointing menu">
    {/* hamburger menu */}
    <a className='toc item'
      onClick={()=>(active)?setActive(false):setActive(true)}>
      {(active)?<i className="angle double left icon"></i>:
        <i className="sidebar icon"></i>
      }
    </a>
    
    <Link to='/' className="item">Home</Link>
    <Link to="/about" className="item">About</Link>
    

    {/* let users access feature */}
    {(user.signedIn)?
      <>
        <Link to="/custom" className="item">Custom Workout</Link>
        <Link to="/trackwo" className="item">Track Workout</Link>
        <Link to="/nutrition" className="item">Nutrition</Link>
        <Link to="/lognutrition" className="item">Nutrition Log</Link>

        <div className='right item'>
          <div className="ui buttons">
            <div className='ui red icon button'>{user.username}</div>
            <button className='ui blue icon button' onClick={logout}><i className='logout icon'></i></button>
          </div>
        </div> 
      </>
      : 
      <>
        <Link to="/custom" className="item">Custom Workout</Link>
        <Link to="/nutrition" className="item">Nutrition</Link>
        <div className="right item">
          <Link to='/register' className='blue ui compact button' style={{marginRight:5}}>Register</Link>
          <Link to='/login' className='blue ui compact button' style={{marginLeft:5}}>Login</Link>
        </div> 
      </>
      }
    
  </div>
  )
}

export default NavBar