import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
 import './App.css'
 import Header from './Header'
 import Home from './Home'
 import About from './About'
 import Skills from './Skills'
import Projects from './Projects'
import Contact from './Contact'
 import Footer from './Footer'



 






 


function App() {
  

  return (
    
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">

    <Header/>
    <Home/>
    <About/>
    <Skills/>
    <Projects/>
    <Contact/>
  
  <Footer/>
  </div>
    
  )
}

export default App
