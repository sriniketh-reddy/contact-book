import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/Form';
import ContactsList from './components/ContactsList';
import PaginationControls from './components/PaginationControls';
import './App.css';


function App() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [contactsCount, setContactsCount] = useState(5);


  const fetchContacts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/contacts?page=${page}&limit=${contactsCount}`);
      const data = await response.json();
      setContacts(data);
    }
    catch(e) {
      console.error("Error:", e.message);
    }
  };

  useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/contacts?page=${page}&limit=${contactsCount}`)
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(e => console.error("Error:", e.message));
  },[page,contactsCount]);

  const deleteContact = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/contacts/${id}`, {
        method: 'DELETE'
      });
      fetchContacts();
    } catch(e) {
      console.error("Error:", e.message);
    }
  };


  return (
    <div className="container overflow-scroll" styles={{padding: '20px'}}>
      <h1 className="text-center">Contact Book</h1>
      <div className="row">
        <PaginationControls page={page} setPage={setPage} contactsCount={contactsCount} setContactsCount={setContactsCount}/>
        <Form fetchContacts={fetchContacts} />
        <ContactsList contacts={contacts} deleteContact={deleteContact}/>
      </div>
    </div>
  );
}

export default App;
