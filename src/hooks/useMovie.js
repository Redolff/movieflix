import { useEffect, useState } from "react"

export const useMovie = (id) => {
    const [loading, setLoading] = useState(false)
    const [movieId, setMovieId] = useState(null)

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://localhost:3000/movies/${id}`)
                if (!response.ok) {
                    console.error(`Error fetching response: ${response.status}`)
                }
                const data = await response.json()
                setMovieId(data)
            } catch (error) {
                console.error('Error cargando la pelicula: ', error)
            } finally {
                setLoading(false)
            }
        }
        fetchMovie()
    }, [id])

    return { movieId, loading }
}