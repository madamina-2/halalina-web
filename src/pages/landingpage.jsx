import React from 'react'
import LandingLayout from '../components/layouts/landinglayout'

const LandingPage = () => {
  return (
    <LandingLayout>
      {/* This is the content that will be placed above the background */}
      <div className='text-center m-10'>
        <h2>Welcome to the Page</h2>
        <p>This content will appear above the background.</p>
      </div>
    </LandingLayout>
  )
}

export default LandingPage
