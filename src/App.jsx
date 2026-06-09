import React from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard'
import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'

// API configuration

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  // State variables
  const [SearchTerm, setSearchTerm] = useState('')
  const [ErrorMessage, setErrorMessage] = useState('')
  const [Movies, setMovies] = useState([])
  const [IsLoading, setIsLoading] = useState(false)

  // Debounced search term to optimize API calls
  const [DebouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  
  const [, cancel] = useDebounce(
    () => {
      setDebouncedSearchTerm(SearchTerm);
    },
    500,
    [SearchTerm]
  )

  // Function to fetch movies from the API
  const fetchMovies = async (query) => {
    setIsLoading(true);
    setErrorMessage('');

    try{
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok){
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json();


      if(data.response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovies([])
        return;
      }

      setMovies(data.results || [])

    } catch(error) {
      console.error(`Error fetching movies ${error}`)
      setErrorMessage(`Error fetching movies, please try again later`)
    } finally {
      setIsLoading(false);
    }


  }

  // Fetch movies when the component mounts
  useEffect( () => {
    fetchMovies(DebouncedSearchTerm);
  }, [DebouncedSearchTerm]);

  return (
    <main>
        <div className='pattern'></div>
        <div className='wrapper'>
          <header>
            <img src="./CinescopeLogo.png" alt=""  className='w-30 h-30'/>
            <h1>CineScope</h1>
            <img src="./hero-img.png" alt="hero image" />
            <h1>Find <span className='text-gradient'>Movies</span> Easily with us!</h1>
          </header>
          <Search SearchTerm={SearchTerm} setSearchTerm={setSearchTerm}/>
          <section className='all-movies'>
            <h2 className='mt-20'>Popular</h2>
          {/* // Display loading spinner, error message, or list of movies based on the state */}
            {IsLoading ? (
              <div className='flex justify-center items-center'>
                <span class="loader"></span>
              </div>
            ) : ErrorMessage ? (
              <p className='text-red-500'>Failed to fetch movies</p>
            ): (
              <ul>
                {Movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )}
              
          </section>
        </div>
    </main>
  )
}

export default App