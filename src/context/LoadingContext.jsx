import { createContext, useContext, useState } from "react";
import '../style/loading.css'

const LoadingContext = createContext()

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState()

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && (
                <div className="div-spinner">
                    <span className="loader"></span>
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => {
    const context = useContext(LoadingContext)
    if(!context) throw new Error('useLoading debe usarse dentro de LoadingProvider')
    return context
}