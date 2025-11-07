export const useUpdateMyList = (userId) => {

    const updateMyList = async ({ profileId, category, item }) => {
        try {
            const response = await fetch(`http://localhost:3000/profiles/myList/${userId}`, {
                method: "PATCH",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ profileId, category, item })
            })
            if (!response.ok) throw new Error("Error al actualizar la lista")
            
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    return { updateMyList }

}