import React, { useState, useEffect } from "react"
import personService from "./services/persons"

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
                    {person.name} {person.number}{" "}
                    <button
                        onClick={() => props.deleteName(person.id, person.name)}
                    >
                        delete
                    </button>
                </div>
            ))}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [nameFilter, setNameFilter] = useState("")

    const hook = () => {
        console.log("Grabbing data from server")
        personService.getAll().then((persons) => setPersons(persons))
    }

    useEffect(hook, [])

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
            personService
                .create({ name: newName, number: newNumber })
                .then((newPerson) => {
                    setPersons(persons.concat(newPerson))
                    setNewName("")
                    setNewNumber("")
                })
        }
    }

    const deleteName = (id, person) => {
        if (window.confirm(`Delete ${person}?`)) {
            personService.remove(id).then(() => {
                setPersons(persons.filter((person) => person.id !== id))
            })
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
            <Persons filteredList={filteredList} deleteName={deleteName} />
        </div>
    )
}

export default App
