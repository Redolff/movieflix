import { useEffect, useState } from "react"

export const useMovies = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API = 'http://localhost:3000/movies'
                const response = await fetch(API)
                if (!response.ok) {
                    throw new Error(`Error fetch API: ${response.status}`)
                }
                const data = await response.json()
                setMovies(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return { movies }

}