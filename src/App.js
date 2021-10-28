import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WebFont from 'webfontloader';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from "./components/RemoveFavourites";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const getMovieRequest = async () => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };

    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Source Code Pro','Droid Sans', 'Chilanka']
          }
        });
       }, []);

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    useEffect (()=>{
        const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites')
        );
        setFavourites(movieFavourites);
    }, []);

    const AddFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );
            setFavourites(newFavouriteList);
            saveToLocalStorage(newFavouriteList);
    };

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
    };

    return (
        <div style={{fontFamily: 'Chilanka'}} className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading="Simone's Movie Search App" />
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <div className='row slider'>
                <MovieList
                    movies={movies}
                    handleFavouritesClick={AddFavouriteMovie}
                    favouriteComponent={AddFavourites}
                />
            </div>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='My Favourie movies' />
            </div>
            <div className='row slider'>
                <MovieList
                    movies={favourites}
                    handleFavouritesClick={removeFavouriteMovie}
                    favouriteComponent={RemoveFavourites}
                />
            </div>
        </div>
    );
};

export default App;

// remember that components are just functions 