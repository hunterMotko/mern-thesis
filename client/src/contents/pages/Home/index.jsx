import React from 'react'
import {Link} from 'react-router-dom'
import flag from '../../images/americanflag.svg.png'
import gym from '../../images/gym.jpeg'
import hockey from '../../images/hockey.jpeg'
import softball from '../../images/softball.jpeg'
import weights from '../../images/weights.jpeg'

const Jumbotron =()=>
<div className="ui inverted blue vertical masthead center aligned segment">
  <div className="ui text container">
    <h1 className="ui red header">American Fitness</h1>
    <div className="ui center aligned padded grid">
      <img className="ui image" src={flag} alt="american flag"/>
    </div>
    <h2>Pride In Fitness and Country</h2>
    <a href="/about" className="ui huge red button">About Us <i className="right arrow icon"></i></a>
  </div>
</div>

const Content=()=>
<div className="ui container">
  <div className="ui relaxed divided items">
    <div className="item">
      <div className="ui small image">
        <img className="ui bordered rounded image" src={weights} alt=""/>
      </div>
      <div className="content">
        <h3 className="header">Our Mission</h3>
        <div className="description">
          To allow all Americans to reach the fitness goals they deserve
        </div>
        <div className="extra">
          <div className="ui right floated primary button" onClick={()=>window.location.href='/about'}>
            Learn More
            <i className="right chevron icon"></i>
          </div>
        </div>
      </div>
    </div>
    <div className="item">
      <div className="ui small image">
      <img className="ui image" src={gym} alt=""/>
      </div>
      <div className="content">
        <Link to='/custom' className="header">Dont know where to start?</Link>
        <div className="description">
          <p>We can help by making you a custom workout plan.</p>
          <p>All you need is what you think you can lift</p>
        </div>
        <div className="extra">
          <div className="ui right floated primary button" onClick={()=>window.location.href='/custom'}>
            Custom Workout
            <i className="right chevron icon"></i>
          </div>
        </div>
      </div>
    </div>
    <div className="item">
      <div className="ui small image">
        <img className="ui bordered rounded image" src={softball} alt=""/>
      </div>
      <div className="content">
        <Link to='/nutrition' className="header">Do you need a competitive edge?</Link>
        <div className="description">
          Make sure that you are getting the right amount of your daily nutrition.
        </div>
        <div className="extra">
          <div className="ui right floated primary button" onClick={()=>window.location.href='/nutrition'}>
            Nutrition
            <i className="right chevron icon"></i>
          </div>
        </div>
      </div>
    </div>
    <div className="item">
      <div className="ui small image">
        <img className="ui image" src={hockey} alt=""/>
      </div>
      <div className="content">
        <Link to='/register' className="header">Want more</Link>
        <div className="meta">
          <Link to='/register'>Sign-Up</Link>
          <Link to='/login'>Sign-In</Link>

        </div>
        <div className="description">
          Are you trying to get the edge on your sport the right way?
        </div>
        <div className="extra">
          <div className="ui right floated primary button" onClick={()=>window.location.href='/register'}>
            Register
            <i className="right chevron icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

const Home = ()=>
<div className="home">
  <Jumbotron/>
  <div className="ui text container">
    <div className="ui horizontal section divider"></div>
    <Content/>
    <div className="ui horizontal section divider"></div>
  </div>
</div>

export default Home