import { toast } from "react-toastify"

export const useAddData = (resource) => {
    const handleAdd = async (data, { onSuccess } = {}) => {
        try {
            const response = await fetch(`http://localhost:3000/${resource}`, {
                method: 'POST',
                headers: { 
                    "Content-Type" : "application/json" 
                },
                body: JSON.stringify(data)
            })
            if(!response.ok) throw new Error(`Error al agregar la ${resource}`)
            const newItem = await response.json()
            console.log('newItem: ', newItem)
            onSuccess?.(newItem)

        }catch(err){
            console.error(err)
            toast.error('No se pudo agregar')
        }
    }

    return { handleAdd }
}
