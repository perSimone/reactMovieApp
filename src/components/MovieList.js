import React from 'react';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex justify-content-center m-3'>
                    <img src={movie.Poster} alt='movie'></img>
                    <div 
                        onClick={() => props.handleFavouritesClick(movie)}
                        className="overlay d-flex align-items-center justify-content-center"
                    >
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;

// in our movielist component we use the map function to display the movie poster 