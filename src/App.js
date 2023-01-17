import { useState } from 'react';
import allContacts from './contacts.json'
import './App.css';

function App() {
  //firs five contacts (iteration 1)

  const firstFive = allContacts.slice(0, 5);

  // State
  const [contacts, setContacts] = useState(firstFive);

  //other contacts
  const otherContacts = allContacts.slice(5, allContacts.length);

  //random contacts
  const addRandomContacts = () => {
    let randomContact = Math.floor(
      Math.random() * otherContacts.length);

    //new contacts
    let newContacts = otherContacts.splice(randomContact, 1);

    setContacts([...contacts, newContacts[0]]);
  }

  //sort by name
  const sortByName = () => {
    const sortedContacts = [
      ...contacts.sort((a, b) => {
        const contactA = a.name.toUpperCase();
        const contactB = b.name.toUpperCase();
        if (contactA < contactB) {
          return -1;
        }
        if (contactA > contactB) {
          return 1;
        }
        return 0;
      })
    ]
    setContacts(sortedContacts);
  };

  //sort by popularity
  const sortByPopularity = () => {
    const sortedContacts = [
     ...contacts.sort((a, b) => {
        return b.popularity - a.popularity;
        }),
    ];
    setContacts(sortedContacts);
  };

  // remove contact
  const removeContact = (id) => {
    const filteredContacts = contacts.filter((contact) => {
      return contact.id!== id;
    });
    setContacts(filteredContacts);
  };

  return <div className="App">
  <h1> IronContacts</h1>
  <button onClick={addRandomContacts}>Add Random Contact</button>
  <button onClick={sortByName}>Sort by Name</button>
  <button onClick={sortByPopularity}>Sort by Popularity</button>
  <table>
    <tbody>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>  
        <th>Won Emmy</th>
        <th>Actions</th>
        </tr>
        {contacts.map((contact) => {
          return (
            <tr key={contact.id}>
              <td>
              <img src={contact.pictureUrl} width={70} alt={contact.name} />
              </td>
              <td>{contact.name}</td>
              <td>{(Math.ceil(contact.popularity) / 2).toFixed(2)}</td>
              <td>{contact.wonOscar ? "🏆" : ""}</td>
              <td>{contact.wonEmmy ? "🏆" : ""}</td>
              <td>
                <button onClick={() => removeContact(contact.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
     </tbody>
  </table>
  </div>
  
};

export default App;
