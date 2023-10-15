import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/notFound.css'

const NotFound = () => {
  return (
    <div className='notfound-container'>
        <h2>404</h2>
        <p>Je nám líto, ale požadovaná stránka nebyla nalezena</p>
        <Link to={'/'}><button className='notfound-button'>Zpět na homepage</button></Link>
    </div>
  )
}

export default NotFound