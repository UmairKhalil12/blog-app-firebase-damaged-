import React from 'react'
import './Tags.css'

function Tags({ tags }) {
    return (
        <div>
            <h3 style={{color : 'gray'}}>Tags</h3>
            <hr />
            <div className='tag-mapping'>
                {tags.map((tag, index) => {
                    return (
                        <span className='tag'>{tag}</span>
                    )
                })}
            </div>
        </div>
    )
}

export default Tags
