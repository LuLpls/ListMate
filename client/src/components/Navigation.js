import React from 'react'
import { useState, useEffect } from 'react'
import SideBar from './bricks/SideBar'
import '../styles/navigation.css'


const Navigation = () => {

  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 1000)
  const [menuVisible, setMenuVisible] = useState(false)

  const handleResize = () => {
    if(window.innerWidth < 1000){
      setSidebarVisible(false)
    } else {
      setSidebarVisible(true)
      setMenuVisible(false)
    }
  }

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    setMenuVisible(!menuVisible)
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])

  return (
    <nav>
      <div className="navbar-container">
        { (!sidebarVisible || menuVisible ) && <div className='navbar-img-wrapper' onClick={toggleSidebar}>
            <img src="/hamburger_menu_white.png" alt="menu" />
          </div>
        }
        <div className='navbar-center-content'><h1>ListMate</h1></div>
      </div>
      <div className={`sidebar-container ${sidebarVisible ? 'sidebar-visible' : ''}`}>
        { sidebarVisible && <SideBar /> }
        </div>
    </nav>
  )
}

export default Navigation