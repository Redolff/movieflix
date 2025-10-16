import { useEffect, useState } from "react"
import { useLoading } from "../context/LoadingContext"

export const useFetchId = (resource, id) => {
    const [dataId, setDataId] = useState(null)
    const { isLoading, setIsLoading } = useLoading()

    useEffect(() => {
        const fetchMovie = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`http://localhost:3000/${resource}/${id}`)
                if (!response.ok) {
                    console.error(`Error fetching response: ${response.status}`)
                }
                const data = await response.json()
                setDataId(data)
            } catch (error) {
                console.error(`Error cargando ${resource}: `, error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchMovie()
    }, [resource, id])

    return { dataId, isLoading }
}