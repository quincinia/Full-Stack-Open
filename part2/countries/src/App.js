import React, { useState, useEffect } from "react"
import axios from "axios"

const SizeError = (props) => {
    return <div>Too many matches, specify another filter</div>
}

const CountryInfo = (props) => {
    let { name, capital, population, languages, flag } = props
    return (
        <div id="country-info">
            <h1>{name}</h1>
            capital {capital}
            <br />
            population {population}
            <h2>languages</h2>
            <ul>
                {languages.map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={flag} alt={`flag of ${name}`} />
        </div>
    )
}

const CountriesList = (props) => {
    return (
        <div>
            {props.list.map((country, index) => (
                <div key={index}>{country.name}</div>
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
