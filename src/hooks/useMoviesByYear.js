import { useEffect, useState } from "react"

export const useMoviesByYear = (year) => {
    const [moviesYear, setmoviesYear] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try {
                const response = await fetch(`http://localhost:3000/movies?year=${year}`)
                if(!response.ok) throw new Error(`Error fetching response: ${response.status}`)
                const data = await response.json()
                setmoviesYear(data)
            } catch(e){
                console.error('Error al cargar las movies: ', e)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [year])

    return { moviesYear, loading }
}