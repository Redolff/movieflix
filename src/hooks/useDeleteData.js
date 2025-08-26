import { useNavigate } from "react-router-dom"

export const useDeleteData = (resource, id) => {
    const navigate = useNavigate()

    const handleDelete = async () => {
        if (!window.confirm(`¿Seguro que quieres eliminar esta ${resource.slice(0, -1)}?`)) return

        try {
            const response = await fetch(`http://localhost:3000/${resource}/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) throw new Error(`Error al eliminar la ${resource.slice(0, -1)}`)
            alert(`${resource.slice(0, -1)} eliminado correctamente`)
            navigate('/')
        } catch (error) {
            console.error(error)
            alert(`Hubo un problema al eliminar la ${resource.slice(0, -1)} ❌`)
        }
    }

    return { handleDelete }

}