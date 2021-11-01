import React from 'react'
import logo from '../images/americanflag.svg.png'

const Footer = () =>
<>
<div className="ui inverted red vertical footer segment">
  <div className="ui center aligned container">
    <div className="ui stackable inverted divided grid">
      <div className="five wide column">
        <h4 className="ui inverted header">Contact Us</h4>
        <div className="ui inverted list">
          <div className="item">Number: 989-662-2652</div>
          <div className="item">Email: hmotko@gmail.com</div>
        </div>
      </div>
      <div className="five wide column">
        <h4 className="ui inverted header">Quick Links</h4>
        <div className="ui inverted link list">
          <a href="#root" className="item">Nutrition Facts</a>
          <a href="#root" className="item">Olympics Training</a>
          <a href="#root" className="item">BodyBuildersOfAmerica</a>
        </div>
      </div>
      <div className="five wide column">
        <h4 className="ui inverted header">Follow Us</h4>
        <div className="ui inverted link list">
          <div className="item">
            <div className="ui facebook button">
              <i className="facebook icon"></i>
              Facebook
            </div>
          </div>
          <div className="item">
            <div className="ui twitter button">
              <i className="twitter icon"></i>
              Twitter
            </div>
          </div>
          <div className="item">
            <div className="ui google plus button">
              <i className="google plus icon"></i>
              Google Plus
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="ui inverted section divider"></div>
    <div className="ui inverted header">
      <img src={logo} width='25' height='25' className="ui mini bordered rounded image" alt="Logo"/>
      <div className='content'>
        © All Copyrights Reserved for All-American Fitness
        <div className="sub header">---</div>
      </div>
    </div>
  </div>
</div>
</>

export default Footer