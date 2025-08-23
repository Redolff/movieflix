import '../style/movies.css'
import { useFetchData } from "../hooks/useFetchData";
import { Serie } from "../components/Serie";
import { Carrousels } from '../components/Carrousels';

export const Series = () => {
    const { data: allSeries } = useFetchData("series")
    const { data: seasonSeries } = useFetchData("series", { season: 5 })
    const { data: crimeSerie } = useFetchData("series", { genre: "crime" })

    return (
        <div>
            <Carrousels 
                title={`Todas las series`}
                items={allSeries}
                renderItem={(allSeries) => <Serie serie={allSeries} key={allSeries.id} /> }
            />
            <Carrousels 
                title={`Series de Crimen`}
                items={crimeSerie}
                renderItem={(crimeSerie) => <Serie serie={crimeSerie} key={crimeSerie.id} /> }
            />
            <Carrousels 
                title={`Series de 5 temporadas`}
                items={seasonSeries}
                renderItem={(seasonSeries) => <Serie serie={seasonSeries} key={seasonSeries.id} /> }
            />
        </div>
    )
}