import React from 'react'
import { Link } from 'react-router-dom'

function Pagenotfound() {
  return (
    <div style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: "100dvh",
        gap:"10px"
    }}>
        <h1>404 Page Not found</h1>
        <p><Link to="/">click here</Link> to go back to home</p>  
    </div>
  )
}

export default Pagenotfound