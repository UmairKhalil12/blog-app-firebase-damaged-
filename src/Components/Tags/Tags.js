import React from 'react'
import './Tags.css'
import { Link } from 'react-router-dom'

function Tags({ tags }) {
    return (
        <div>
            <h3 style={{ color: 'gray' }}>Tags</h3>
            <hr />
            <div className='tag-mapping'>
                {tags?.map((tag, index) => {
                    return (
                        <Link to={`/tag/${tag}`} style={{textDecoration : "none", color : 'black'}} >
                            <p className='tag'>{tag}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Tags
