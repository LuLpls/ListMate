import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sidebar-container'>
      <nav className='sidebar-nav'>
        <div className='sidebar-link-container'>
          <div><Link to='/'>Shopping Lists</Link></div>
          <div><Link to='/trash'>Trash</Link></div>
        </div>
      </nav>
    </div>
  )
}

export default SideBar