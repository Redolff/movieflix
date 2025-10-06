import '../../style/movies.css'
import { Carrousels } from "../../components/Carrousels"
import { useFetchData } from '../../hooks/useFetchData'
import { Movie } from '../../components/movies/Movie'

export const Movies = () => {
    const { data: allMovies } = useFetchData("movies")
    const { data: actionMovies } = useFetchData("movies", { genre: "action" })
    const { data: crimeMovies } = useFetchData("movies", { genre: "crime" })
    const { data: dramaMovies } = useFetchData("movies", { genre: "drama" })
    const { data: moviesYear } = useFetchData("movies", { year: 2000 })

    return (
        <div>
            <Carrousels 
                title={`Todas las peliculas`} 
                items={allMovies} 
                renderItem={(allMovies) => <Movie movie={allMovies} key={allMovies._id} /> } 
            />
            <Carrousels 
                title={`Películas de Accion`} 
                items={actionMovies} 
                renderItem={(actionMovies) => <Movie movie={actionMovies} key={actionMovies._id} /> } 
            />
            <Carrousels 
                title={`Películas de Crimen`} 
                items={crimeMovies} 
                renderItem={(crimeMovies) => <Movie movie={crimeMovies} key={crimeMovies._id} /> } 
            />
            <Carrousels 
                title={`Películas de Drama`} 
                items={dramaMovies} 
                renderItem={(dramaMovies) => <Movie movie={dramaMovies} key={dramaMovies._id} /> } 
            />

            <Carrousels 
                title={`Películas del año 2000`} 
                items={moviesYear} 
                renderItem={(moviesYear) => <Movie movie={moviesYear} key={moviesYear._id} /> } 
            />
        </div>
    )
}