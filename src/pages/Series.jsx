import { useEffect, useRef, useState } from "react"
import '../style/movies.css'
import { Serie } from "../components/Serie";

export const Series = () => {
    const [series, setSeries] = useState([])
    const rowRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API = 'http://localhost:3000/series'
                const response = await fetch(API)
                if(!response.ok){
                    throw new Error('Error fetch API')
                }
                const data = await response.json()
                setSeries(data)
            } catch(error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const scrollByAmount = (dir) => {
        const row = rowRef.current;
        if (!row) return;
        const amount = Math.round(row.clientWidth * 0.9); // “página” casi completa
        row.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
    };


    return (
        <div className="movies-container">
            <h1> Todas las series </h1>

            <div className="movies-slider">
                <button className="arrow-btn arrow-left" onClick={() => scrollByAmount("left")} aria-label="Anterior">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                <section className="movies-row" ref={rowRef}>
                    {series.map((serie) => {
                        return (
                            <Serie serie={serie} key={serie.id} />
                        )
                    })}
                </section>

                <button className="arrow-btn arrow-right" onClick={() => scrollByAmount("right")} aria-label="Siguiente">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
            </div>

        </div>
    )
}