import React from 'react'
import Header from '../components/Header'
import Companies from '../components/Companies'
// import FAQData from '../Data/FAQData'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import CompanyCalendar from '../components/CompanyCalender'
import About from '../components/About'

const Home = () => {
  return (
    <div>
        <Header/>
        {/* <CompanyCalendar/> */}
      <About/>
        <FAQ/>
        <Companies/>
        <Footer/>
    </div>
  )
}

export default Home