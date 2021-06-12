import React, { useState, useEffect } from "react"
import axios from "axios"

const SizeError = (props) => {
    return <div>Too many matches, specify another filter</div>
}

const CountryInfo = (props) => {
    let { name, capital, population, languages, flag, useButton, startOpen } =
        props

    const [showInfo, setInfoToggle] = useState(startOpen)

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
                />
            ))}
        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [nameFilter, setNameFilter] = useState("")

    // grab data
    const hook = () => {
        console.log("Grabbing countries...")
        axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
            console.log("Received!")
            setCountries(response.data)
        })
    }
    useEffect(hook, [])

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
