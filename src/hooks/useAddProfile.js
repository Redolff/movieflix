import { toast } from "react-toastify"

export const useAddProfile = (resource, id) => {

    const handleAddProfile = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/${resource}/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) throw new Error(`Error al agregar el Perfil`)
            toast.success("Perfil agregado correctamente")

        } catch (error) {
            console.error(error)
            toast.error(`Hubo un problema al agregar el perfil`)
        }
    }

    return { handleAddProfile }

}