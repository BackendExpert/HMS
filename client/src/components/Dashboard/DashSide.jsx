import React from 'react'

const DashSide = () => {
  return (
    <div>
        <center>
            <h1 className="text-xl bg-gradient-to-br from-blue-400 to-pink-500 font-semibold inline-block text-transparent bg-clip-text">HMS | UOP</h1>
        </center>

        <div className="flex pl-4 pt-4">
            <div className="">
                <img src="https://avatars.githubusercontent.com/u/138636749?v=4" alt="" className='h-12 rounded-full w-auto'/>
            </div>
            <div className="pl-4">
                <h1 className="text-lg">s956465465</h1>
                <p className="uppercase text-red-500 text-sm">admin</p>
            </div>
        </div>

        <hr className='mt-5'/>
    </div>
  )
}

export default DashSide