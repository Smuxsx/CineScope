import React from 'react'

const MovieCard = ({movie}) => {
  return (
    <div className='movie-card'>
        {/* <p key={movie.id} className='text-white'>{movie.title}</p> */}
        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : './SearchIcon.svg'} alt={movie.title} />
        <div className='mt-8'>
            <h3 className='text-white'>{movie.title}</h3>
            <div className='content'>
                <div className='rating'>
                    <img src="./Star.png" alt="" />
                    <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>•</span>
                <p className='lang'>{movie.original_language ? movie.original_language : 'N/A'}</p>
                <span>•</span>
                <p className='year'>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard