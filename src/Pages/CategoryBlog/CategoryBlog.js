import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../Components/Spinner/Spinner'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../Utility/Firebase/firebase'
import BlogSection from '../../Components/BlogSection/BlogSection'
import './CategoryBlog.css'

export default function CategoryBlog() {
    const [CategoryBlog, setCategoryBlog] = useState([])
    const [loading, setLoading] = useState(false)
    const {category } = useParams();

    const CategoryTagBlog = useCallback(async () => {
        setLoading(true)
        const blogRef = collection(db, 'blogs');
        const categoryBlogQuery = query(blogRef, where('category', '==',category));
        const docSnapshot = await getDocs(categoryBlogQuery);
        let categoryBlog = []

        docSnapshot.forEach((doc) => {
            categoryBlog.push({ id: doc.id, ...doc.data() });
        })
        setCategoryBlog(categoryBlog);
        setLoading(false);
    }, [category ])

    useEffect(() => {
        CategoryTagBlog();
    }, [CategoryTagBlog])

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='main-tag-blog-page'>

            <h3>{`Category : ${category.toLocaleUpperCase()}`}</h3>

            <div>
                {
                    CategoryBlog.map((item) => {
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
