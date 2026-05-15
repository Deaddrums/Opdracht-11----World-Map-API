import './App.css';
import worldMap from "./assets/world_map.png"
import axios from "axios";
import {useState} from "react";
import {regionColor} from "./helpers/RegionColor.jsx";

function App() {

    const [country, setCountry] = useState([])

    async function fetchCountry() {

        try {
            const country = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region');
            console.log(country)

            setCountry(country.data)

            country.data.sort((a, b) => {
                return a.population - b.population
            })
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <>
            <div className="GlobalLayout">
                <img src={worldMap} alt="worldMap"/>
                <div className="countryLayout">
                    <button onClick={fetchCountry}> Klik hier voor info over de landen
                    </button>
                    <ul>
                        {country.map((c) => <li key={c.name.common}>
                            <img src={c.flags.png} alt={c.name.common} width="50"/>
                            <h4 style={{color: regionColor(c.region)}}>{"   " + c.name.common}</h4>
                            <p>{"Has a population of " + c.population + " people"}</p>
                        </li>)}
                    </ul>

                </div>
            </div>
        </>
    )
}

export default App
