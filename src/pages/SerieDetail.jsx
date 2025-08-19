import '../style/movieDetail.css'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const SerieDetail = () => {
    const { id } = useParams()
    const [serie, setSerie] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchSerie = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://localhost:3000/series/${id}`)
                if (!response.ok) {
                    console.error('Error fetching response')
                }
                const data = await response.json()
                setSerie(data)
            } catch (error) {
                console.error('Error cargando la serie: ', error)
            } finally {
                setLoading(false)
            }
        }
        fetchSerie()
    }, [id])

    if (loading) {
        return (
            <div className="movie-skeleton">
                <div className="skeleton-poster"></div>
                <div className="skeleton-info">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                </div>
            </div>
        )
    }

    if (!serie) return (
        <div className="container">
            <div className="icon">🎬</div>
            <h1>404 - Serie no encontrada</h1>
            <p>Parece que la serie que buscas no está en nuestra base de datos.
                Verifica el nombre o vuelve a la página principal para seguir explorando.</p>
            <a href="/">Volver al inicio</a>
        </div>
    )

    return (
        <div key={serie.id} className="movie-detail">
            <img src={serie.poster} alt={serie.title} className="movie-detail-poster" />
            <div className="movie-detail-info">
                <h1>{serie.title}</h1>
                <p className="movie-year"><strong>Año:</strong> {serie.year}</p>
                <p className="movie-director"><strong>Director:</strong> {serie.director}</p>
                <p className="movie-duration"><strong>Temporadas:</strong> {serie.seasons} </p>
                <p className="movie-duration"><strong>Episodios totales:</strong> {serie.episodes} </p>
                <div className="movie-actions">
                    <button
                        className="play-btn"
                        onClick={() => console.log('Reproducir: ', serie.title)}
                    >
                        <i className="fa-solid fa-play"></i>
                        Reproducir
                    </button>
                    <button
                        className="add-btn"
                        onClick={() => console.log('Agregar a la lista: ', serie)}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Mi lista
                    </button>
                </div>
            </div>
        </div>
    )
}