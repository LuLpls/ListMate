import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideBar = () => {

  const location = useLocation()

  return (
    <div className='sidebar-container'>
      <nav className='sidebar-nav'>
        <div className='sidebar-link-container'>
          <Link to='/'>
            <div className={location.pathname === '/' ? 'sidebar-active-link' : 'sidebar-notactive-link'}>
              Shopping Lists
            </div>
          </Link>
          <Link to='/trash'>
            <div className={location.pathname === '/trash' ? 'sidebar-active-link' : 'sidebar-notactive-link'}>
              Trash
            </div>
          </Link>
          <Link to='/about'>
            <div className={location.pathname === '/about' ? 'sidebar-active-link' : 'sidebar-notactive-link'}>
              About
            </div>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default SideBar