import './Trending.css'
import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';

export default function Trending({ blogs }) {
    const options = {
        loop: true,
        margin: 12,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            },
        }
    }
    return (
        <div className='trending-main'>
            <h3 style={{ color: 'gray' }} >Trending</h3>
            <hr />
            <div>
                <OwlCarousel className='owl-theme' {...options}>
                    {blogs?.map((items, index) => {
                        return (
                            <div key={items.id} >
                                <div className='trending-blogs-div' style={{ backgroundImage: `url(${items.imgUrl})` }}>
                                    <Link to={`/detail/${items.id}`}>
                                        <div>
                                            <div><p>{items.title}</p></div>
                                            <div className='trending-blog-div-author-date'>
                                                <p className='trending-blog-content-author'>{items.author}</p>
                                                <p className='trending-blog-content-date' >{items.timestamp.toDate().toDateString()}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </OwlCarousel>
            </div>
        </div>
    )
}
