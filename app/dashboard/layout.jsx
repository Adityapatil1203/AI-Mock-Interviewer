import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Header from './_components/Header'
import { Toaster } from 'sonner'

const DashboardLayout = ({children}) => {
  return (
    <div>
        <Header/>
        <div className='mx-5 md:mx-20 lg:mx-26 '>
          <Toaster/>
        {children}
        </div>
     
    </div>
  )
}

export default DashboardLayout