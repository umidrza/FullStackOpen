import { useEffect, useState } from 'react'
import phonebookService from '../services/phonebook';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';
import Notification from './Notification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('');
    const [notification, setNotification] = useState({ message: null })

    useEffect(() => {
        phonebookService.getAll().then((data) => {
            setPersons(data);
        })
    }, []);

    function filterPersons() {
        const filter = filterValue.toLowerCase();
        return persons.filter(p => p.name.toLowerCase().includes(filter) || p.number.includes(filter));
    }

    const clearForm = () => {
        setNewName('')
        setNewNumber('')
    }


    function addNewPerson(e) {
        e.preventDefault();
        const existingPerson = persons.find((p) => p.name === newName)

        if (existingPerson) {
            const res = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

            if (res) {
                updatePerson(existingPerson.id);
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
                notifyWith(`Added ${data.name}`);
                clearForm();
            })
            .catch(error => {
                notifyWith(error.response.data.error, true)
            })
    }

    function updatePerson(id) {
        const updatedPerson = {
            id: id,
            name: newName,
            number: newNumber
        }

        phonebookService.update(id, updatedPerson)
            .then((data) => {
                const updatedPersons = persons.map(p => p.id === id ? data : p);
                setPersons(updatedPersons);
                notifyWith(`Phonenumber of ${data.name} updated!`)
                clearForm();
            })
            .catch(error => {
                notifyWith(error.response.data.error, true)
            })
    }

    function deletePerson(id) {
        const person = persons.find(p => p.id === id);
        const res = confirm(`Delete ${person.name} ?`);
        if (!res) return;

        phonebookService.remove(id)
            .then(() => {
                const updatedPersons = persons.filter(p => p.id !== id);
                setPersons(updatedPersons);
                notifyWith(`Deleted ${person.name}`);
            })
            .catch(error => {
                notifyWith(error.response.data.error, true)
            });
    }

    const notifyWith = (message, isError = false) => {
        setNotification({ message, isError })
        setTimeout(() => {
            setNotification({ message: null })
        }, 5000)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification} />

            <Filter filterValue={filterValue} setFilterValue={setFilterValue} />

            <PersonForm addNewPerson={addNewPerson}
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
            />

            <h2>Numbers</h2>

            <Persons persons={filterPersons()} deletePerson={deletePerson} />
        </div>
    )
}

export default App