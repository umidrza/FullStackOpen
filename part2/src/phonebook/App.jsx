import { useState } from 'react'
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

    const [shownPersons, setShownPersons] = useState([...persons]);

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    function handleNewName(e) {
        setNewName(e.target.value);
    }

    function handleNewNumber(e) {
        setNewNumber(e.target.value);
    }

    function addNewPerson(e) {
        e.preventDefault();

        if (persons.some(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const newPersons = [...persons, { name: newName, number: newNumber }];
        setPersons(newPersons);
        setShownPersons(newPersons);
        setNewName('');
        setNewNumber('');
    }

    function handlefilterChange(e) {
        const value = e.target.value;

        const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(value) || p.number.includes(value));
        setShownPersons(filteredPersons);
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter handlefilterChange={handlefilterChange} />


            <PersonForm addNewPerson={addNewPerson}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber}
            />

            <h2>Numbers</h2>

            <Persons persons={shownPersons}/>
        </div>
    )
}

export default App