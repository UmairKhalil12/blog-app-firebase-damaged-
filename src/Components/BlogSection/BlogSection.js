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


export default function BlogSection({id , title , imgUrl, category , author, timestamp , description , userId }) {
    const [loading, setLoading] = useState(true);

    // console.log('blog section loading',loading)

    const { userInfo, user } = useStore();
    // console.log('blogsection', userInfo);

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

    const currentUserId = userInfo?.uid;

    // console.log('blogsection', blogs)
    return (

        <div className='blogsection-main' >
            

            <div className='blogsection-map' key={id}>
                <div>
                    <img src={imgUrl} alt={title} className='blogsection-img' />
                </div>

                <div>
                    <p className='blogsection-category'>{category}</p>
                    <p className='blogsection-title'>{title}</p>
                    <div className='title-timestamp'>
                        <p className='blogsection-author'>{author}</p>
                        <p className='blogsection-date'>{timestamp.toDate().toDateString()}</p>
                    </div>

                    <p className='blogsection-description'>{excerpt(description, 120)}</p>

                    <div className='blog-readmore-edit-btn'>
                        <div>
                            <Link to={`/detail/${id}`} >
                                <BlogButton text='Read More' />
                            </Link>

                        </div>
                        <div className='blog-edit-delete'>
                            {user && currentUserId === userId ?
                                <>
                                    <Link to={`/update/${id}`}><button><FaRegEdit size={30} /></button></Link>
                                    <button onClick={() => handleBlogDelete(id)} ><MdDelete size={30} /></button>
                                    {/* {console.log('delete blog id', item.id)} */}
                                </>
                                : null
                            }

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
