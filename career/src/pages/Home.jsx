import React from 'react'
import Header from '../components/Header'
import Companies from '../components/Companies'
// import FAQData from '../Data/FAQData'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Header/>
        <FAQ/>
        <Companies/>
        <Footer/>
    </div>
  )
}

export default Home