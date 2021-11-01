import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import flag from '../../images/americanflag.svg.png'
import useForm from '../Helpers/useForm'
import validate from './validateReg'

const Register = () =>{
  // controlled component values
  const [values, setValues] = useState(
    {username:'',email:'', password:'', verifyPassword:''}
  )

  // helper form function
  const {handleChange, handleSubmit, errors}=
    useForm(values, setValues, submit, validate)

  // check form and send user info to the database
  async function submit(){
    const {username, email, password, verifyPassword} = values
    if(password===verifyPassword){
      try{
        const res = await fetch(`/api/register`, {
          method: 'POST',
          body: JSON.stringify({username,email,password}),
          headers: {'Content-Type':'application/json'}
        })
        if(res.status<200||res.status>299){
          return console.log('process problem')
        }else{
          const body = await res.text()
          const result = JSON.parse(body)
          if(result.status === 'success')return window.location.href = '/login'
        }
      }catch(err){
        console.log('register'+err)
      }
    }else{
      console.log('Not the same passwords')
    }
  }

  
    

  return(
  <div className="register">
    <div className="ui text container" >
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <div className="ui blue image header">
            <img src={flag} className="image"/>
            <h1 className='content'>Please Register Here Your Fitness Perks!</h1>
          </div>
        
        <form className='ui form' onSubmit={handleSubmit}>
          <div className="ui stacked segment">
            <div className="field">
              <label>UserName: </label>
              <input
                className={`${errors.username && 'inputError'}`}
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder='username...'
              />
              {errors.username&&<p className="error">{errors.username}</p>}

            </div>
            <div className="field">
              <label>Email: </label>
              <input
                className={`${errors.email && 'inputError'}`}
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder='Email...'
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="field">
              <label>Password: </label>
              <input
                className={`${errors.password&&'inputError'}`}
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder='password...'
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="field">
              <label>Verify Password: </label>
              <input
                className={`${errors.verifyPassword&&'inputError'}`}
                type="password"
                name="verifyPassword"
                value={values.verifyPassword}
                onChange={handleChange}
                placeholder='password...'
              />
              {errors.verifyPassword && <p className="error">{errors.verifyPassword}</p>}

            </div>
            
            <div className="center aligned field">
              <button className='ui button blue' type="submit">Register</button>
            </div>
          </div>
        </form>
        <div className="ui message">Already Regitstered? <Link to='/login'>Login</Link></div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register