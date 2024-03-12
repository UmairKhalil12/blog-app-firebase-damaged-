import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MostPopular.css'

export default function MostPopular({ blogs }) {
    const navigate = useNavigate();
    return (
        <div className='main-most-popular'>
            <h3 style={{ color: 'gray' }}>Most Popular</h3>
            <hr />
            {blogs?.map((blog) => {
                return (
                    <div key={blog.id} className='most-popular' onClick={() => navigate(`/detail/${blog.id}`)}>
                        <div className='most-popular-img-div'>
                            <img src={blog.imgUrl} alt={blog.title} className='most-popular-img' />
                        </div>
                        <div className='most-popular-blog-content'>
                            <div>
                                <div>{blog.title}</div>
                                <div className='most-popular-date'>{blog.timestamp.toDate().toDateString()}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
