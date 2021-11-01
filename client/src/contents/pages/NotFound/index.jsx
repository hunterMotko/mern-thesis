import React from 'react'
import {Link} from 'react-router-dom'

// handle if page is not found
const NotFound=()=> 
  <div className="notfound">
    <div className="ui text container">
      <div className="ui raised center aligned segment">
        <h1>Page Not Found</h1>
        <Link to='/' className="ui orange button">Home page</Link>
      </div>
    </div>

  </div>

export default NotFound