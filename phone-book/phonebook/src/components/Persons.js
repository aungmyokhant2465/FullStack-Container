import React from 'react'

const Person = ({person, handleDelete}) => {
    return (
      <p>
        {person.name} {person.number}
        <button onClick={handleDelete}>delete</button>
      </p>
    )
}

const Persons = (props) => {
    return (
        <div>
          {
            props.filteredPersons.map(person => 
              <Person key={person.name} person={person} handleDelete={() => props.handleDeleteOf(person.id)}/>
            )
          }
        </div>
      )
}

export default Persons