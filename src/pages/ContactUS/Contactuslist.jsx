import React from 'react'
import Contactus from './Contactus'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

const Contactuslist = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar/>
        <Contactus />
      </div>
    </div>
  )
}

export default Contactuslist
