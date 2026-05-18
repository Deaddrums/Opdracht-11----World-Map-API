import './App.css';
import worldMap from "./assets/world_map.png"
import axios from "axios";
import {useState} from "react";
import {regionColor} from "./helpers/RegionColor.jsx";
import {formatPopulation} from "./helpers/FormatPopulation.jsx";

function App() {

    const [country, setCountry] = useState([])
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [error, setError] = useState('')

    async function searchCountry() {
        setError('');
        setSearchResult([]);

        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${search}?fields=name,flags,population,capital,region,subregion,borders,domains`)

            setSearchResult(response.data)

        } catch (e) {
            console.error(e)
            setError(`${search} bestaat niet. Probeer het opnieuw.`);
        }
    }

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
            <div className="countrySearch">
                <h3>Zoek specifieke landen informatie</h3>
                <input
                    type="text"
                    name="query"
                    id="query-field"
                    placeholder="zoek hier"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={searchCountry}>Zoek</button>
                <ul>
                    {searchResult.map((c) => <li key={c.name.common}>
                        <img src={c.flags.png} alt={c.name.common} width="50"/>
                        <h4 style={{color: regionColor(c.region)}}>
                            {c.name.common}
                        </h4>
                        <p>
                            {c.name.common + " is situated in " + c.subregion +
                                " and the capital is " + (c.capital ? c.capital[0] : "N/A") + "" }
                            </p>
                        <p>{"It has a population of " + formatPopulation(c.population) + " people and it borders with " + c.borders + " neighboring countries" }</p>

                        {/*Ik heb gecht geen idee hoe ik die domains goed moet krijgen, dus ja, deze klopt idd niet*/}
                        <p>{"Websites can be found on " + (c.domains?.join(", ") || "N/A") + " domains"}</p>

                    </li>)}
                    {error && <span id="error-message">{error}</span>}
                </ul>
            </div>
        </>
    )
}

export default App