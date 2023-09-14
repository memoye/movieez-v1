import React, { useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import '../../styles/searchBox.css';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const searchFormRef = useRef();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.query.value;
        navigate(`/search/${query}`);
    };

    return (
        <form ref={ searchFormRef } className="search" onSubmit={ handleSearch }>
            <BiSearch className="searchIcon" />
            <input type="text" placeholder="What do you want to watch?" name="query" />
        </form>
    );
};

export default SearchBox;




