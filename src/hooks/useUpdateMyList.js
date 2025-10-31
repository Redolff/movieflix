import { toast } from "react-toastify"

export const useUpdateMyList = () => {
    
    const updatedMyList = async ({ userId, profileId, category, item }) => {
        try {
            const response = await fetch(`http://localhost:3000/profiles/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ profileId, category, item })
            })
            if(!response.ok) throw new Error(`Error al modificar la Lista`)
            const updatedProfile = await response.json()
            return updatedProfile

        } catch(error) {
            console.error(error)
            toast.error(`Hubo un problema al modificar la Lista`)
            return null
        }
    }

    return { updatedMyList }
}