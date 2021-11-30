import React, { useState, useEffect } from 'react'
import personService from './services/persons'

import FilterPerson from './components/FilterPerson'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')
  const [notification, setNotification] = useState({})

  const checkExist = (name) => {
    return persons.find(p => p.name === name)
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const repalcePersonNumber = (name) => {
    const oldPerson = persons.find(p => p.name === name)
    const changedPerson = { ...oldPerson, number: newNumber }
    personService.update(changedPerson)
      .then(person => {
        setPersons(persons.map(p => p.id !== person.id ? p : person))
        setFilteredPersons(persons.map(p => p.id !== person.id ? p : person))
      })
  }

  const createNewPerson = (e) => {
    e.preventDefault()
    if(checkExist(newName)) {
      let confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(confirm) {
        repalcePersonNumber(newName)
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService.create(newPerson)
      .then(createdPerson => {
        setNotification({message: `Added ${createdPerson.name}`, isError: false})
        setTimeout(() => {
          setNotification({})
        }, 3000)
        setPersons(persons.concat(createdPerson))
        setFilteredPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(err => {
        setNotification({message: err.error, isError: true})
        setTimeout(() => {
          setNotification({})
        }, 3000)
      })
  }
  
  const handlefilterName = (e) => {
    setfilterName(e.target.value.toLowerCase())
    setFilteredPersons(persons.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const fetchPersons = () => {
    personService.getAll()
      .then(phones => {
        setPersons(phones)
        setFilteredPersons(phones)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const personDeleteOf = (id) => {
    let person = persons.find(p => p.id === id)
    let confirm = window.confirm(`Delete ${person.name} ?`)
    if(confirm) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setFilteredPersons(persons.filter(p => p.id !== id))
        })
        .catch(() => {
          setNotification({message: `Information of ${person.name} has already been removed from server`, isError: true})
          setTimeout(() => {
            setNotification({})
          }, 3000)
        })
    }
  }

  useEffect(fetchPersons, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} isError={notification.isError} />
      <FilterPerson filterName={filterName} handlefilterName={handlefilterName}/>
      <h2>add a new</h2>
      <PersonForm createNewPerson={createNewPerson} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDeleteOf={personDeleteOf} />
    </div>
  )
}

export default App