/* eslint-disable react/prop-types */
import { useContext } from 'react'

import './index.scss'
import { TodoContext } from '../../context'

function TodoSearch () {
    const { searchValue, setSearchValue } = useContext(TodoContext)

    return (
        <div className='search-container'>  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="magnifying-glass">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input value={searchValue} onChange={(event)=>{setSearchValue(event.target.value)}} type="text" placeholder="Search" />
        </div>
    )
}

export {TodoSearch}