import React from 'react'
import './BlogButton.css'

export default function BlogButton({text , onClick}) {
  return (
    <div>
      <button className='blog-btn' onClick={onClick} >{text}</button>
    </div>
  )
}
