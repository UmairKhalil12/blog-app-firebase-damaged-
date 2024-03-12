import React from 'react'
import error from '../../images/download.jpeg'
import './ErrorPage.css'



export default function ErrorPage() {
  return (
    <div style={{backgroundImage: `url(${error})`}} className='main-error' >
      Error 404 not found 
    </div>
  )
}
