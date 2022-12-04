import React from 'react'
import "./About.css"
import FormsNavbar from '../Forms/FormsNavbar'
import FormsFooter from '../Forms/FormsFooter'
import { Container } from 'react-bootstrap'

const About = () => {
  return (
    <div>
      <FormsNavbar/>
      <div id="about_banner">
        <h1>About</h1>
        </div>
      <div className="about">
        <div className="content">
        Welcome to CookDuke, we are a globally-inspired eatery, where we share our passion for exploring the world through <br/> food and drink, by serving modern versions of hand-selected dishes from around the world, or what we call, “curated<br/> global cuisine.”<br/><br/>

Here, we believe that food can serve as a gateway for learning about other cultures, for fostering understanding, and<br/> for breaking down the barriers that divide us as citizens of the world. After all, no matter how different we are –<br/> everyone loves to eat!<br/><br/>

At CookDuke, we are fortunate to have a diverse team of talented chefs who have brought their multi-ethnic cooking<br/> styles and experiences together to help create unique dishes and drinks that showcase the best flavors and<br/> ingredients from all over the world. Through the blending of these backgrounds, we seek to modernize and elevate<br/>
 traditional dishes by making them lighter, brighter, and full of flavor. While we may use a bit of creative license from<br/>
  time to time, we still try to stay true to the spirit of the originals. <br/><br/>

Having had the opportunity to travel to different parts of the world, we’ve been over-whelmed by the hospitality that<br/>
 we’ve been shown in other countries, often times by people of the most humble means, in the most primitive of<br/>
  environments. In many cultures, the ultimate privilege is to host outside travelers, and we too embrace this honor.<br/>
   Thank you for joining us on our journey to explore the world through food and drink!<br/><br/>

Welcome to our home!
        </div>
      </div>
      <FormsFooter/>
      </div>
  )
}

export default About