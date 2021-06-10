import React, { useState } from "react"

const Filter = (props) => {
    return (
        <div>
            filter shown with
            <input value={props.value} onChange={props.onChange} />
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name:
                <input value={props.name} onChange={props.onNameChange} />
            </div>
            <div>
                number:
                <input value={props.number} onChange={props.onNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = (props) => {
    return (
        <div>
            {props.filteredList.map((person) => (
                <div key={person.name}>
                    {person.name} {person.number}
                </div>
            ))}
        </div>
    )
}

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
            setNewName("")
            setNewNumber("")
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
            <Filter value={nameFilter} onChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm
                onSubmit={addName}
                name={newName}
                onNameChange={handleNameChange}
                number={newNumber}
                onNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons filteredList={filteredList} />
        </div>
    )
}

export default App
