import { useNavigate } from 'react-router-dom'
import './Search.css'
import { IoMdSearch } from "react-icons/io";

import React from 'react'

export default function Search({ search, handleChange }) {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            navigate(`/search/searchQuery=${search}`);
        }
        else {
            navigate('/home')
        }
    }
    return (
        <div>
            <form className='search-form' onSubmit={handleSubmit}>
                <div>
                    <input
                        type='text'
                        value={search}
                        className='search input'
                        placeholder='Search Blog'
                        onChange={handleChange}
                    />
                </div>
                <button className='' type='submit'><IoMdSearch /></button>
            </form>
        </div>
    )
}
