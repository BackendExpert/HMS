import React from 'react'

const DashFooter = () => {
    const currentyear = new Date().getFullYear()
  return (
    <div className='pl-4 py-4 border-t border-gray-300 bg-white md:flex justify-between pr-4'>
        <h1 className=""><span className='font-semibold'>CopyRight &copy;</span> {currentyear}. <span>All Rights Reserved. | Engineered by <a href="https://blackalphalabs.vercel.app" target='_blank' className='text-blue-800 font-semibold'>BLACK ALPHA LABS</a> </span></h1>
        <p className="">version 1.0</p>
    </div>
  )
}

export default DashFooter