import { toast } from "react-toastify"

export const useUpdateData = (resource, id) => {
    const handleUpdate = async (formData, { onSucces, onError }) => {
        try{
            const plainData = { ...formData }
            const response = await fetch(`http://localhost:3000/${resource}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(plainData)
            })
            if(!response.ok) throw new Error(`Error al actualizar la ${resource}`)
            const updatedData = await response.json()

            toast.success(`${resource.slice(0, -1)} actualizado correctamente`)

            if(onSucces) onSucces(updatedData)

        }catch(error){
            console.error(error)
            toast.error(`Hubo un problema al actualizar la ${resource}`)
            if(onError) onError(error)
        }
    }

    return { handleUpdate }
}