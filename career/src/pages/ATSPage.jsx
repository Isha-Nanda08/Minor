import React from 'react'
import Header from '../components/Header'
import ATSscore from '../components/ATSscore'
import ATSboard from '../components/ATSboard'
import ResumeOptimization from '../components/ResumeOptimization'
import Footer from '../components/Footer'

const ATSPage = () => {
  return (
    <div>
        {/* <Header/> */}
        <ATSboard/>
        <ResumeOptimization/>
        <ATSscore/>
        {/* <Footer/> */}
    </div>
  )
}
export default ATSPage;