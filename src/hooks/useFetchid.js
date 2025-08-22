import { useEffect, useState } from "react"

export const useFetchId = (resoruce, id) => {
    const [dataId, setDataId] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://localhost:3000/${resoruce}/${id}`)
                if (!response.ok) {
                    console.error(`Error fetching response: ${response.status}`)
                }
                const data = await response.json()
                setDataId(data)
            } catch (error) {
                console.error(`Error cargando ${resoruce}: `, error)
            } finally {
                setLoading(false)
            }
        }
        fetchMovie()
    }, [resoruce, id])

    return { dataId, loading }
}