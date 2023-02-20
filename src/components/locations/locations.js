import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        },
        []
    )
    return <>
        <h2>Locations</h2>
        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location">
                            <header>{location.address}</header>
                            <footer>{location.sqFt} sqft</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}
