import React from 'react'
import '../styles/about.css'

const About = () => {
  return (
    <div className='about-container'>
      <div className='about-content'>

      </div>
      <h2>Welcome to ListMate!</h2>
      
      <div className='about-first-paragraph'>
        <h3>Our vision</h3>
        <p>
          Our shopping list application was born out of passion and a desire to make people's lives easier. We believe that organizing shopping lists should be simple, efficient, and fun. That's why we created this app to assist you with your shopping and make your daily tasks easier.
        </p>
      </div>

      <div className='about-second-paragraph'>
        <h3>About us</h3>
        <p>
          We are a team of technology enthusiasts who share a common love for development and innovation. With our skills in modern technologies, we joined forces to create an app that solves shopping and organization-related challenges.
        </p>
      </div>

      <div className='about-third-paragraph'>
        <h3>Our technology</h3>
        <p>
          Our application is built using modern technologies and programming languages to ensure speed, security, and smooth user experience. We are using MERN stack (MongoDB, Express, React, NodeJS)
        </p>
        <div className='about-images-container'>
          <img src="/mongodblogo.png" alt="mongoDB" />
          <img src="expresslogo.png" alt="expresJS" />
          <img src="/reactlogo.png" alt="react" />
          <img src="/nodelogo.png" alt="nodeJs" />
        </div>
      </div>

      <div className='about-fourth-paragraph'>
        <h3>Contact</h3>
        <p>
          We want to hear your ideas, feedback, and suggestions. You can reach us at the following addresses:
        </p>
        <p>
          Email: [contact email adress]
        </p>
      </div>
    </div>
  )
}

export default About