import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456'},
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122'}
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

    function handlefilterChange(e){
        const value = e.target.value;

        const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(value) || p.number.includes(value));
        setShownPersons(filteredPersons);
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <div>
                <p>filter shown with</p>
                <input onChange={handlefilterChange}/>
            </div>

            <form onSubmit={addNewPerson}>
                <h2>Add a new person</h2>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNewNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>

            <div>
                {shownPersons.map((person) =>
                    <p key={person.name}>{person.name} {person.number}</p>
                )}
            </div>
        </div>
    )
}

export default App