import React, { useState, useEffect, useCallback } from 'react';
import './HomePage.css';
import {
    onSnapshot,
    collection,
    query,
    orderBy,
    getDocs,
    where,
    limit,
    startAfter,
    count
} from 'firebase/firestore';
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
import BlogButton from '../../Components/BlogButton/BlogButton';
import Category from '../../Components/Category/Category';

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const { blogs, setBlogs } = useStore();
    const { tags, setTags } = useStore();
    const [trend, setTrend] = useState([]);
    const [search, setSearch] = useState();
    const [lastVisible, setLastVisible] = useState(null);
    const queryString = useQuery();
    const searchQuery = queryString.get("searchQuery");
    const [isBlogEmpty, setIsBlogEmpty] = useState(false);
    const [totalBlogs, setTotalBlogs] = useState(null);


    const location = useLocation();

    const searchBlog = useCallback(async () => {
        const blogRef = collection(db, 'blogs');
        const searchTitleQuery = query(blogRef, where('title', '==', searchQuery));
        const searchTagQuery = query(blogRef, where('tags', 'array-contains', searchQuery));
        const titleSnapshot = await getDocs(searchTitleQuery);
        const tagSnapshot = await getDocs(searchTagQuery);
        let searchTitleBlogs = [];
        let searchTagBlogs = [];
        titleSnapshot.forEach((doc) => {
            searchTitleBlogs.push({ id: doc, ...doc.data() });
        })

        tagSnapshot.forEach((doc) => {
            searchTagBlogs.push({ id: doc.id, ...doc.data() });
        })

        const combinedSearch = searchTitleBlogs.concat(searchTagBlogs);
        setBlogs(combinedSearch);
        setIsBlogEmpty(true);
    }, [searchQuery, setBlogs])

    const getBlogs = useCallback(async () => {
        const blogRef = collection(db, 'blogs');
        const firstFour = query(blogRef, orderBy('title'), limit(4));
        const documentSnap = await getDocs(firstFour);
        setBlogs(documentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLastVisible(documentSnap.docs[documentSnap.docs.length - 1]);
    }, [setBlogs ]);


    const updateState = (docSnapShot) => {
        const isCollectionEmpty = docSnapShot.size === 0;
        if (!isCollectionEmpty) {
            const blogsData = docSnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()

            }))
            // setBlogs((blogs) => [...blogs, ...blogsData])
            setBlogs([...blogs, ...blogsData]);
            setLastVisible(docSnapShot.docs[docSnapShot.docs.length - 1]);
        }
        else {
            toast.info("no blogs found");
            setIsBlogEmpty(true)
        }
    }

    const fetchMore = async () => {
        setLoading(true);
        const blogRef = collection(db, 'blogs');
        const nextFour = query(blogRef, orderBy('title'), limit(4), startAfter(lastVisible));
        const docSnapShot = await getDocs(nextFour);
        updateState(docSnapShot);
        setLoading(false);
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
                // setBlogs(list);
                setLoading(false);
                const uniqueTags = [...new Set(tags)];
                setTags(uniqueTags);
                setTotalBlogs(list)
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
    }, [setTags]);

    useEffect(() => {
        getBlogs();
        setIsBlogEmpty(false);
    }, [getBlogs])

    // console.log('homepage',blogs)

    useEffect(() => {
        const uniqueTrendingBlogs = new Set(trend);
        blogs.forEach((blog) => {
            if (blog.trending === 'yes' && !uniqueTrendingBlogs.has(blog)) {
                uniqueTrendingBlogs.add(blog);
            }
        });
        setTrend([...uniqueTrendingBlogs]);
    }, [blogs, trend]);

    const handleChange = (e) => {
        const { value } = e.target;
        if (isEmpty(value)) {
            getBlogs();
        }
        setSearch(value);
        setIsBlogEmpty(false);
    };

    useEffect(() => {
        if (!isNull(searchQuery)) {
            searchBlog();
        }
    }, [searchQuery, searchBlog])


    if (loading) {
        return <Spinner />;
    }

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    //category counts

    const counts = totalBlogs.reduce((prevValue, currentValue) => {
        let name = currentValue.category;
        if (!prevValue.hasOwnProperty(name)) {
            prevValue[name] = 0;
        }
        prevValue[name]++;
        // delete prevValue["undefined"];
        return prevValue;
    }, {});

    const categoryCount = Object.keys(counts).map((k) => {
        return {
            category: k,
            count: counts[k],
        };
    });

    // console.log("categoryCount", categoryCount);

    return (
        <div className="main-home">
            <h1>Home</h1>
            <Trending blogs={trend} />
            <div className="main-home-blogs">
                <div className="home-blog-blogsection">
                    <h3>Daily Blogs</h3>
                    <hr></hr>
                    {blogs.map((blog) => {
                        return (
                            <BlogSection
                                blogs={blogs}
                                key={blog.id}
                                id={blog.id}
                                {...blog}
                            />)
                    })}

                    {blogs.length === 0 && location.pathname !== '/' && (
                        <>
                            <h4>No Blog found with searched keyword :</h4>
                            <strong>{searchQuery}</strong>
                        </>
                    )}
                    {isBlogEmpty ? '' : <BlogButton text='Load More' onClick={fetchMore} />}
                </div>

                <div className="home-tag-popular">
                    <div>
                        <Search search={search} handleChange={handleChange} />
                        <Tags tags={tags} />
                        <MostPopular blogs={blogs} />
                        <Category catBlogsCount={categoryCount} />
                    </div>
                </div>
            </div>
        </div>
    );
}
