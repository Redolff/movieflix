import { useCallback, useEffect, useState } from "react"

export const useFetchId = (resource, id) => {
    const [dataId, setDataId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchId = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/${resource}/${id}`)
            if (!response.ok) {
                console.error(`Error fetching response: ${response.status}`)
            }
            const data = await response.json()
            setDataId(data || [])
        } catch (error) {
            console.error(`Error cargando ${resource}: `, error)
        } finally {
            setIsLoading(false)
        }
    }, [resource, id, setIsLoading])

    useEffect(() => {
        fetchId()
    }, [fetchId])

    return { dataId, isLoading, refetch: fetchId }
}