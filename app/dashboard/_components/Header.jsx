"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {
    const path = usePathname()
    console.log(path)
    const router = useRouter()
  return (
    <div className='flex p-4 justify-between items-center bg-secondary shadow-sm ' >
        {/* <Image alt='webcam-image' src={"/logo.svg"}  width={160} height={100}/> */}
        <h1 className='font-bold text-3xl text-blue-600 ' >Interview Me</h1>
        <ul className='hidden md:flex gap-6 ' >
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && 'text-primary font-bold' } `} onClick={()=>router.push('/dashboard')} >Dashboard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/question' && 'text-primary font-bold' } `}>Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/upgrade' && 'text-primary font-bold' } `}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/howworks' && 'text-primary font-bold' } `}>How it Works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header