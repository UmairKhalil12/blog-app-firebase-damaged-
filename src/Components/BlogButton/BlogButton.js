import React from 'react'
import './BlogButton.css'

export default function BlogButton({text}) {
  return (
    <div>
      <button className='blog-btn'>{text}</button>
    </div>
  )
}
