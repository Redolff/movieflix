import { useEffect, useState } from "react"

export const useMoviesByGenre = (genre) => {
    const [moviesGenre, setMoviesGenre] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/movies?genre=${genre}`)
                if(!response.ok) throw new Error(`Error fetch response: ${response.status}`)
                const data = await response.json()
                setMoviesGenre(data)
            } catch(e) {
                console.error('Error al cargar las movies por genre: ', e)
            } finally {
                setLoading(false)
            }
        }
        if(genre) fetchData()
    }, [genre])

    return { moviesGenre, loading }
}