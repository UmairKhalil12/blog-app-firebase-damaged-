import { useNavigate } from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";
import './Search.css'

import React from 'react'
import Input from '../Input/Input';
import Heading from '../Heading/Heading';

export default function Search({ search, handleChange }) {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            navigate(`/search?searchQuery=${search}`);
        }
        else {
            navigate('/home')
        }
    }
    return (
        <div className='main-search'>
            <h3>Search</h3>
            <hr /> 
            <form className='search-form' onSubmit={handleSubmit}>
                <div>
                    <Input
                        type='text'
                        value={search}
                        className='search input'
                        placeholder='Search Blog'
                        onChange={handleChange}
                    />
                </div>
                <button className='search-icn-btn' type='submit'><IoMdSearch size={25} /></button>
            </form>
        </div>
    )
}
