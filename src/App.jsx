import './App.css';
import worldMap from "./assets/world_map.png"
import axios from "axios";
import {useState} from "react";


function App() {

    const [country, setCountry] = useState([])

    async function fetchCountry() {

        try {
            const country = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population');
            console.log(country)

            setCountry(country.data)
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
                        {country.map((c) => <li key={c.name.common}>{c.name.common}</li>)}

                    </ul>

                </div>
            </div>
        </>
    )
}

export default App
