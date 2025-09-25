import { MovieCard } from "../movie-card/movie-card";
import { useState } from "react";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Inception" ,
            description: "A mind-bending thriller about dream invasion."
        } ,
    {
      id: 2,
      title: "The Matrix",
      description: "A hacker discovers the reality is a simulation."
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A journey through space and time to save humanity."
    }

    ])
}

if ( movies.length === 0) {
    return <div> The List is empty! </div>;
}

return (
    <div>
<h2>Movie List</h2>
{movies.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
))}
</div>
);
