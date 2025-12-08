import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { useState } from 'react'

export const HomePage = () => {
     const [currentSection, setCurrentSection] = useState('home');
    
    
    
      const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      };
  return (
    <>
    <Navbar currentSection={currentSection} scrollToSection={scrollToSection} />
    <Hero scrollToSection={scrollToSection}/>
    </>
  )
}
