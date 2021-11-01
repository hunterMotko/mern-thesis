import React, {useEffect, useState} from 'react'
import flag from '../../images/americanflag.svg.png'
import {Link} from 'react-router-dom'
import validate from './validateLogin'
import useForm from '../Helpers/useForm'


const Login = ({onUserChange}) =>{
  const [values, setValues] = useState({username:'',password:''})
  const [done, setDone] = useState(false)
  const [problem, setProblem] = useState(false)

  // form helper function
  const {handleChange, handleSubmit, errors} = useForm(values, setValues, submit, validate)

  // handle submit to database to check user
  async function submit(){
    const {username, password} = values
    try{
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type':'application/json'}
      })
      if(res.status<200||res.status>299){
        setProblem(true)
        return console.log('process problem')
      }else{
        const body = await res.text();
        const result = JSON.parse(body);
        if(result){
          const { signedIn, user_id, username } = result;
          onUserChange({signedIn, user_id, username})
          setDone(true)
        }
      }
    }catch(err){
      console.log('catch block err ' + err)
    }
  }

  // reload page
  if(done) return window.location.href = '/'

 return(
<div className="login">
  <div className="ui text container">
    <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui blue image header">
          <img src={flag} className="image"/>
          <div className="content">
            To start tracking your progess now <br/>Please Log-in here
          </div>
        </h2>
        {(problem)?<div className='inputError'>Were sorry. Have you registered?</div>:<></>}
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  className={`${errors.username&&'inputError'}`}
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  placeholder="Username..."
                />
              </div>
              {errors.username&&<p className="error">{errors.username}</p>}
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input 
                  className={`${errors.password&&'inputError'}`}
                  type="password" 
                  name="password" 
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password..."
                />
              </div>
              {errors.password&&<p className="error">{errors.password}</p>}
            </div>
            <button type='submit' className="ui fluid large blue submit button">Login</button>
          </div>
        </form>
        <div className="ui message">
          New to us? <Link to='/register'>Register</Link>
        </div>
      </div>
    </div>
  </div>
</div>
 )
}

export default Login