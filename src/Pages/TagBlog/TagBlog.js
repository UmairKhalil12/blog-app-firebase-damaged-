import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../Components/Spinner/Spinner'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../Utility/Firebase/firebase'
import BlogSection from '../../Components/BlogSection/BlogSection'
import './TagBlog.css'

export default function TagBlog() {
    const [TagBlog, setTagBlog] = useState([])
    const [loading, setLoading] = useState(false)
    const { tag } = useParams();

    const getTagBlog = useCallback(async () => {
        setLoading(true)
        const blogRef = collection(db, 'blogs');
        const tagBlogQuery = query(blogRef, where('tags', 'array-contains', tag));
        const docSnapshot = await getDocs(tagBlogQuery);
        let tagBlog = []

        docSnapshot.forEach((doc) => {
            tagBlog.push({ id: doc.id, ...doc.data() });
        })
        setTagBlog(tagBlog);
        setLoading(false);
    }, [tag])

    useEffect(() => {
        getTagBlog();
    }, [getTagBlog])

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='main-tag-blog-page'>

            <h3>{`Tag : ${tag.toLocaleUpperCase()}`}</h3>

            <div>
                {
                    TagBlog.map((item) => {
                        return (
                            <div className='tag-blogs-div'>
                                <BlogSection key={item.id} {...item} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
