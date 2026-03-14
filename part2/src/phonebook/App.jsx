import { useEffect, useState } from 'react'
import phonebookService from '../services/phonebook';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        phonebookService.getAll().then((data) => {
            setPersons(data);
        })
    }, []);

    function handleNewName(e) {
        setNewName(e.target.value);
    }

    function handleNewNumber(e) {
        setNewNumber(e.target.value);
    }

    function handlefilterChange(e) {
        setFilterValue(e.target.value);
    }

    function filterPersons(){
        return persons.filter(p => p.name.toLowerCase().includes(filterValue) || p.number.includes(filterValue));
    }

    function addNewPerson(e) {
        e.preventDefault();

        if (persons.some(p => p.name === newName)) {
            const res = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

            if (res){
                const person = persons.find(p => p.name == newName);
                updatePerson(person.id);
            }

            return;
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }

        phonebookService.create(newPerson)
            .then((data) => {
                setPersons([...persons, data]);
                setNewName('');
                setNewNumber('');
            })
    }

    function updatePerson(id){
        const updatedPerson = {
            id: id,
            name: newName,
            number: newNumber
        }

        phonebookService.update(id, updatedPerson)
            .then((data) => {
                const updatedPersons = persons.map(p => p.id === id ? data : p);
                setPersons(updatedPersons);
                setNewName('');
                setNewNumber('');
            })
    }

    function deletePerson(id){
        const person = persons.find(p => p.id === id);
        const res = confirm(`Delete ${person.name} ?`);
        if (!res) return;

        phonebookService.remove(id)
            .then(() => {
                const updatedPersons = persons.filter(p => p.id !== id);
                setPersons(updatedPersons);
                setNewName('');
                setNewNumber('');
            })
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

            <Persons persons={filterPersons()} deletePerson={deletePerson}/>
        </div>
    )
}

export default App