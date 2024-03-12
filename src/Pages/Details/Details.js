import React, { useEffect, useState } from 'react'
import './Details.css'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../Utility/Firebase/firebase'
import Heading from '../../Components/Heading/Heading'
import Spinner from '../../Components/Spinner/Spinner'
import Tags from '../../Components/Tags/Tags'
import useStore from '../../Utility/Zustand/Zustand'
import MostPopular from '../../Components/MostPopular/MostPopular'

export default function Details() {
  const [loading, setLoading] = useState(true)
  const { id } = useParams();
  console.log('details id', id)
  const [blog, setBlog] = useState(null);
  const { blogs } = useStore();
  const { tags } = useStore();
  console.log('blogs , tags', blogs, tags);

  const getBlogDetail = async () => {
    try {
      const docRef = doc(db, 'blogs', id);
      const blogDetail = await getDoc(docRef)
      setBlog(blogDetail.data());
      setLoading(false)
    }
    catch (error) {
      console.log('error in details', error.message)
      console.log('error in details', error)
      setLoading(false)
    }

  }

  useEffect(() => {
    if (id) {
      getBlogDetail();
      setLoading(true);
    }
  }, [id ])

  if (loading) {
    return <Spinner />
  }


  return (
    <div className='main-blog-detail' >
      <div className='detail-blog-title-date' style={{ backgroundImage: `url('${blog?.imgUrl}')` }}>
        <div>
          <p className='detail-banner-date'>{blog?.timestamp.toDate().toDateString()}</p>
          <Heading text={blog?.title} />
        </div>

      </div>

      <div className='detail-blog'>
        <div className='detail-blog-description'>
          <div className='detail-blog-author-date'>
            <p className='detail-blog-author' >{blog?.author}</p>
            <p className='detail-blog-date'>{blog?.timestamp.toDate().toDateString()}</p>
          </div>

          <hr />
          <p>{blog?.description}</p>

        </div>

        <div className='detail-blog-tags'>
          <Tags tags={tags} />
          <MostPopular blogs={blogs} />
        </div>
      </div>
    </div>
  )
}
