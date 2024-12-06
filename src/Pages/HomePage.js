import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {

  const navigate = useNavigate();

  return (
    <div className='home-cotainer'>
      
        <h1 className='home-heading'>This is my first project</h1>
        <button className='user-button' onClick={() => navigate('/users')}>Users</button>

    </div>
  )
}