import { useEffect, useState } from 'react'
import axios from 'axios'
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data);
            })
    }, []);

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
        setNewName('');
        setNewNumber('');
    }

    function handlefilterChange(e) {
        setFilterValue(e.target.value);
    }

    function filterPersons(){
        return persons.filter(p => p.name.toLowerCase().includes(filterValue) || p.number.includes(filterValue));
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filterValue={filterValue} handlefilterChange={handlefilterChange} />

            <PersonForm addNewPerson={addNewPerson}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber}
            />

            <h2>Numbers</h2>

            <Persons persons={filterPersons()}/>
        </div>
    )
}

export default App