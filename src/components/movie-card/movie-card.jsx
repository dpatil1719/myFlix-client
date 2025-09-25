export const MovieCard = ({movie, onMovieClick}) => {
       return (
        <div onClick={() => onMovieClick(movie)}>
        <h3> {movie.title} </h3>
        </div>
       )
}
    