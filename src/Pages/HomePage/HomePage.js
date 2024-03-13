import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { onSnapshot, collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '../../Utility/Firebase/firebase';
import { toast } from 'react-toastify';
import BlogSection from '../../Components/BlogSection/BlogSection';
import Spinner from '../../Components/Spinner/Spinner';
import Tags from '../../Components/Tags/Tags';
import MostPopular from '../../Components/MostPopular/MostPopular';
import Trending from '../../Components/Trending/Trending';
import useStore from '../../Utility/Zustand/Zustand';
import Search from '../../Components/Search/Search';
import isEmpty from 'lodash/isEmpty';
import { useLocation } from 'react-router-dom';
import { isNull } from 'lodash';

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const { blogs, setBlogs } = useStore();
    const { tags, setTags } = useStore();
    const [trend, setTrend] = useState([]);
    const [search, setSearch] = useState();
    const queryString = useQuery();
    const searchQuery = queryString.get("searchQuery");

    const searchBlog = async() =>{
        const blogRef = collection(db, 'blogs');
        const searchTitleQuery = query(blogRef , where('title', '==', searchQuery))
        const titleSnapshot = await getDocs(searchTitleQuery)
        let searchTitleBlogs=  []
        titleSnapshot.forEach((doc)=>{
            searchTitleBlogs.push({id : doc , ...doc.data()})
        })
        setBlogs(searchTitleBlogs)
    }

    useEffect(() => {
        const subscribe = onSnapshot(
            collection(db, 'blogs'),
            (snapshot) => {
                let list = [];
                let tags = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                    tags.push(...doc.get('tags'));
                });
                setBlogs(list);
                setLoading(false);
                const uniqueTags = [...new Set(tags)];
                setTags(uniqueTags);
            },
            (error) => {
                toast.error('Error fetching blogs');
                console.log('Error fetching blogs', error);
                console.log('Error fetching blogs', error.message);
                setLoading(false);
            }
        );

        return () => {
            subscribe();
        };
    }, [setBlogs, setTags]);

    useEffect(() => {
        const uniqueTrendingBlogs = new Set(trend);
        blogs.forEach((blog) => {
            if (blog.trending === 'yes' && !uniqueTrendingBlogs.has(blog)) {
                uniqueTrendingBlogs.add(blog);
            }
        });
        setTrend([...uniqueTrendingBlogs]);
    }, [blogs]);

    const handleChange = (e) => {
        const { value } = e.target;
        if (isEmpty(value)) {
            getBlogs();
        }
        setSearch(value);
    };

    useEffect(()=>{
        if(!isNull(searchQuery)){
            searchBlog(); 
        }
    }, [searchQuery])


    const getBlogs = async () => {
        const blogRef = collection(db, 'blogs');
        const blogQuerry = query(blogRef, orderBy('title'));
        const documentSnap = await getDocs(blogQuerry);
        setBlogs(documentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    if (loading) {
        return <Spinner />;
    }

    function useQuery(){
        return new URLSearchParams(useLocation().search);
    }


    return (
        <div className="main-home">
            <h1>Home</h1>
            <Trending blogs={trend} />
            <div className="main-home-blogs">
                <div className="home-blog-blogsection">
                    <BlogSection blogs={blogs} />
                </div>
                <div className="home-tag-popular">
                    <Search search={search} handleChange={handleChange} />
                    <Tags tags={tags} />
                    <MostPopular blogs={blogs} />
                </div>
            </div>
        </div>
    );
}
