import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sidebar-container'>
      <nav className='sidebar-nav'>
        <div className='sidebar-link-container'>
          <div><Link>Shopping Lists</Link></div>
          <div><Link>Trash</Link></div>
        </div>
      </nav>
    </div>
  )
}

export default SideBar