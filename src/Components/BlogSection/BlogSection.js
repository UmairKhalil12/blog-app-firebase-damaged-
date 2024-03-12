import { toast } from 'react-toastify'
import { excerpt } from '../../Utility/excerpt'
import BlogButton from '../BlogButton/BlogButton'
import './BlogSection.css'
import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../Utility/Firebase/firebase'
import useStore from '../../Utility/Zustand/Zustand'


export default function BlogSection({ blogs }) {
    const [ setLoading] = useState(true);

    const { userInfo, user } = useStore();
    console.log('blogsection', userInfo);

    const handleBlogDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete the blog?"))
            try {
                setLoading(true);
                await deleteDoc(doc(db, 'blogs', id));
                toast.success('Blog deleted successfully');
                setLoading(false);
            }
            catch (error) {
                toast.error('Error deleting blog');
                console.log('error deleting blog', error);
            }
    }

    const userId = userInfo?.uid;

    // console.log('blogsection', blogs)
    return (

        <div className='blogsection-main' >
            <h3>Daily Blogs</h3>
            <hr></hr>
            {
                blogs?.map((item) => {
                    return (
                        <div className='blogsection-map' key={item.id}>
                            <div>
                                <img src={item.imgUrl} alt={item.title} className='blogsection-img' />
                            </div>

                            <div>
                                <p className='blogsection-category'>{item.category}</p>
                                <p className='blogsection-title'>{item.title}</p>
                                <div className='title-timestamp'>
                                    <p className='blogsection-author'>{item.author}</p>
                                    <p className='blogsection-date'>{item.timestamp.toDate().toDateString()}</p>
                                </div>

                                <p className='blogsection-description'>{excerpt(item.description, 120)}</p>

                                <div className='blog-readmore-edit-btn'>
                                    <div>
                                        <Link to={`/detail/${item.id}`} >
                                            <BlogButton text='Read More' />
                                        </Link>

                                    </div>
                                    <div className='blog-edit-delete'>
                                        {user && userId === item?.userId ?
                                            <>
                                                <Link to={`/update/${item.id}`}><button><FaRegEdit size={30} /></button></Link>
                                                <button onClick={() => handleBlogDelete(item.id)} ><MdDelete size={30} /></button>
                                            </>
                                            : null
                                        }

                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
