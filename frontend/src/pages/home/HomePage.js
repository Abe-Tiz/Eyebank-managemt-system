import React from 'react'
import EyeCareAwareness from '../../sections/awareness/awareness'
import About from '../../sections/about/About'
import Contact from '../../sections/contact/contact'
import Home from '../../sections/auth/Home'

const HomePage = () => {
  return (
    <div>
      <Home />
      <About />
      <EyeCareAwareness />
      <Contact />
    </div>
  )
}

export default HomePage
