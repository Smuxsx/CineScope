import React from 'react'

const search = ({SearchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
        <div>
            <img src="./SearchIcon.svg" alt="search" />
            <input type="text" placeholder='Search Movies' value={SearchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
        </div>
    </div>
  )
}

export default search