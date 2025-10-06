import { useEffect, useState } from "react"

export const useFetchId = (resource, id) => {
    const [dataId, setDataId] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true)
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
                setLoading(false)
            }
        }
        fetchMovie()
    }, [resource, id])

    return { dataId, loading }
}