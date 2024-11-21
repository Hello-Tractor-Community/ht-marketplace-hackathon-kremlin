import React from 'react'
import Header from './Header'
import { SearchBarComponent } from '@/components/search-bar'
import HeroContent from './HeroContent'

const HeroSection = () => {
  return (
    <>
     <Header/>
     <SearchBarComponent/>
     <HeroContent/>
    </>
  )
}

export default HeroSection