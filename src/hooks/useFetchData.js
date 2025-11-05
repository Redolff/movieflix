import { useEffect, useState } from "react"

export const useFetchData = ( resource, filters = {} ) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState()

    useEffect(() => {
        if(!resource) return 

        const fetchData = async () => {
            setIsLoading(true)
            try {
                const queryParams = new URLSearchParams(filters).toString()
                const response = await fetch(`http://localhost:3000/${resource}${queryParams ? `?${queryParams}` : ""}`)

                if(!response.ok) throw new Error(`Error fetch response: ${response.status}`)

                const data = await response.json()
                setData(data)
                
            } catch(e) {
                console.error(`Error al cargar ${resource}: `, e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [resource, JSON.stringify(filters)])

    return { data, isLoading }
}