import React from 'react'
import secureLocalStorage from 'react-secure-storage'

const Students = () => {
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')
  return (
    <div>Students</div>
  )
}

export default Students