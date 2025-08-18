import { Games } from "./Games"
import { Movies } from "./Movies"
import { Series } from "./Series"

export const Inicio = () => {
    return (
        <>
            <Movies />
            <Series />
            <Games />
        </>
    )
}