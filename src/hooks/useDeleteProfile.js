import { toast } from "react-toastify"

export const useDeleteProfile = (resource, id) => {

    const handleDeleteProfile = async (profileId) => {
        try {
            const response = await fetch(`http://localhost:3000/${resource}/${id}/${profileId}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (!response.ok) throw new Error(`Error al eliminar el perfil`)
            toast.success(`Perfil eliminado correctamente`)
        } catch (error) {
            console.error(error)
            toast.error(`Hubo un problema al eliminar el perfil`)
        }
    }

    return { handleDeleteProfile }
}