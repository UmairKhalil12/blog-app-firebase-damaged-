import React from 'react'
import { Link } from 'react-router-dom'
import './Category.css' 

export default function Category({ catBlogsCount }) {
    return (
        <div>
            <h3 style={{ color: 'gray' }}>Categories</h3>
            <hr />
            <div className='category-list-ul' >
                <ul>
                    {catBlogsCount?.map((item, index) => {
                        return (
                            <li key={index} className='category-list-li'>
                                <Link to={`/category/${item.category}`}>
                                   <p>{item.category}</p>
                                    <p>{item.count}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
