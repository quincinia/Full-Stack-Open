import React, { useState } from "react"

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" },
    ])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [nameFilter, setNameFilter] = useState("")

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setNameFilter(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        if (persons.some((item) => item.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat({ name: newName, number: newNumber }))
        }
    }

    // very simple filter
    const filteredList = persons.filter((person) => {
        const filter = nameFilter.toLowerCase()
        const name = person.name.toLowerCase()
        return name.includes(filter)
    })

    return (
        <div>
            <h2>Phonebook</h2>
            filter shown with
            <input value={nameFilter} onChange={handleFilterChange} />
            <h2>add a new</h2>
            <form onSubmit={addName}>
                <div>
                    name:
                    <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {filteredList.map((person) => (
                <div key={person.name}>
                    {person.name} {person.number}
                </div>
            ))}
        </div>
    )
}

export default App
