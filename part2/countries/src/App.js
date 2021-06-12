import React, { useState, useEffect } from "react"
import axios from "axios"

const SizeError = (props) => {
    return <div>Too many matches, specify another filter</div>
}

const CountryInfo = (props) => {
    let {
        name,
        capital,
        population,
        languages,
        flag,
        useButton,
        startOpen,
        findWeather,
    } = props

    const [showInfo, setInfoToggle] = useState(startOpen)

    // initialized to null because an empty object is truthy
    const [weather, setWeather] = useState(null)

    // grab weather for selected country
    const weatherHook = () => {
        if (findWeather === true) {
            axios
                .get(
                    `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}`
                )
                .then((response) => {
                    console.log(response.data)
                    setWeather(response.data)
                })
        }
    }
    useEffect(weatherHook, [findWeather, capital])

    const buttonToggle = () => {
        setInfoToggle(!showInfo)
    }

    if (showInfo === true) {
        return (
            <div id="country-info">
                <h1>
                    {name}{" "}
                    {useButton ? (
                        <button onClick={buttonToggle}>hide</button>
                    ) : null}
                </h1>
                capital {capital}
                <br />
                population {population}
                <h2>languages</h2>
                <ul>
                    {languages.map((language, index) => (
                        <li key={index}>{language}</li>
                    ))}
                </ul>
                <img
                    src={flag}
                    alt={`flag of ${name}`}
                    style={{ width: "100px" }}
                />
                {weather ? (
                    <div>
                        <h2>Weather in {capital}</h2>
                        <b>temperature: </b>
                        {weather.current.temperature} Celsius
                        <br />
                        <img
                            src={weather.current.weather_icons[0]}
                            alt="pictorial of current weather"
                        />
                        <br />
                        <b>wind: </b>
                        {weather.current.wind_speed} km/h{" "}
                        {weather.current.wind_dir}
                    </div>
                ) : null}
            </div>
        )
    } else {
        return (
            <div>
                {name} <button onClick={buttonToggle}>show</button>
            </div>
        )
    }
}

const CountriesList = (props) => {
    return (
        <div>
            {props.list.map((country, index) => (
                <CountryInfo
                    key={index}
                    name={country.name}
                    capital={country.capital}
                    population={country.population}
                    languages={country.languages.map(
                        (language) => language.name
                    )}
                    flag={country.flag}
                    useButton={true}
                    startOpen={false}
                    findWeather={false}
                />
            ))}
        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [nameFilter, setNameFilter] = useState("")

    // grab data
    const countryHook = () => {
        console.log("Grabbing countries...")
        axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
            console.log("Received!")
            setCountries(response.data)
        })
    }
    useEffect(countryHook, [])

    // filter handler
    const handleFilterChange = (event) => {
        setNameFilter(event.target.value)
    }

    // process filtered list
    const filteredList = countries.filter((country) => {
        const filter = nameFilter.toLowerCase()
        const name = country.name.toLowerCase()
        return name.includes(filter)
    })

    // determine what to show
    let display
    if (nameFilter === "") {
        // displays nothing if there is no filter
        display = null
    } else if (filteredList.length > 10) {
        display = <SizeError />
    } else if (filteredList.length === 1) {
        let country = filteredList[0]
        display = (
            <CountryInfo
                name={country.name}
                capital={country.capital}
                population={country.population}
                languages={country.languages.map((language) => language.name)}
                flag={country.flag}
                useButton={false}
                startOpen={true}
                findWeather={true}
            />
        )
    } else {
        // passing the entire array, not just the country names
        display = <CountriesList list={filteredList} />
    }

    return (
        <div>
            find countries
            <input value={nameFilter} onChange={handleFilterChange} />
            {display}
        </div>
    )
}

export default App
