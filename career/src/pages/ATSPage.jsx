import React from 'react'
import Header from '../components/Header'
import ATSscore from '../components/ATSscore'
import ATSboard from '../components/ATSboard'
import ResumeOptimization from '../components/ResumeOptimization'

const ATSPage = () => {
  return (
    <div>
        {/* <Header/> */}
        <ATSboard/>
        <ResumeOptimization/>
        <ATSscore/>
    </div>
  )
}
export default ATSPage;