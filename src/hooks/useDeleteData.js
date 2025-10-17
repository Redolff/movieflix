import { toast } from "react-toastify"

export const useDeleteData = (resource) => {

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/${resource}/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) throw new Error(`Error al eliminar la ${resource.title.slice(0, -1)}`)
            toast.success(`${resource.slice(0, -1)} eliminado correctamente`)
        } catch (error) {
            console.error(error)
            toast.error(`Hubo un problema al eliminar la ${resource.slice(0, -1)}`)
        }
    }

    return { handleDelete }

}