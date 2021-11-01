import React from 'react'
import flag from '../../images/americanflag.svg.png'
import gym8 from '../../images/gym8.jpeg'
import gym9 from '../../images/gym9.jpeg'

const About = ()=>
<div className="about">
  <div className="ui inverted segment">
    <div className="ui center aligned text padded container">
      <h1>About All American Fitness</h1>
      <img src={flag}/>
    </div>
   
    <div className="ui middle aligned stackable grid container">
      <div className="row">
        <div className="eight wide column">
          <h3 className="ui inverted header">Our company history</h3>
          <p>We started in a small town in Michigan as a small Cross Fit Box. After years of growth we had many customers want to be able to plan their own workouts and plans to be able to better reach their fitness potential. Our objective had now changed to help more than just the people in our area but anyone trying to better themselves.</p>
          <h3 className="ui inverted header">Goals we can help you attain.</h3>
           <ul>
            <li>Get Healthier</li>
            <li>Maintain Health</li>
            <li>Gain Muscle</li>
            <li>Gain Weight</li>
            <li>Lose Weight</li>
          </ul>
        </div>
        <div className="six wide right floated column">
          <img className='ui bordered rounded image' src={gym8} alt="workout"/>
        </div>
      </div>
      <div className="row">
        <div className="eight wide column">
          <h3 className="ui inverted header">We help people reach these goals by:</h3>
          <ul>
            <li>Eating Healthier</li>
            <li>Which Foods To Eat</li>
            <li>What Foods To Watch Out For</li>
            <li>Giving Them The Knowlege</li>
            <li>Helping With How to Plan</li>
            <li>What Workouts To Build or Build On</li>
            <li>Supplemental Facts</li>
          </ul>
        </div>
        <div className="six wide right floated column">
          <img className='ui bordered rounded image' src={gym9} alt="workout"/>
        </div>
      </div>
    </div>
     
  </div>
</div>

export default About