import { useEffect, useState } from "react"
import { useLoading } from "../context/LoadingContext"

export const useFetchProfileId = (userId, profileId) => {
    const [profile, setProfile] = useState()
    const { isLoading, setIsLoading } = useLoading()

    useEffect(() => {
        if(!userId || !profileId) return 

        const fetchProfileId = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`http://localhost:3000/profiles/${userId}/${profileId}`)
                if (!response.ok) {
                    console.error(`Error fetching response: ${response.status}`)
                }
                const data = await response.json()
                setProfile(data || [])

            } catch (error) {
                console.error('Error cargando Perfil ID: ', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProfileId()

    }, [setIsLoading, userId, profileId])

    return { profile, isLoading }
}