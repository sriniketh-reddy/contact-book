import "./index.css";
export default function ContactsList(props) {
    const {contacts, deleteContact} = props;
    return (
        <div className="list col-md-6">
            <h1 className="text-center">Contact List</h1>
            <ul style={{listStyleType: 'none', padding: 0}}>
                {contacts.map(contact => (
                    <li key={contact.id} className="shadow p-2 m-2 rounded d-flex justify-content-between align-items-center">
                        <div className="overflow-scroll">
                            <p className="mb-0"><strong>Name: </strong>{contact.name}</p>
                            <p className="mb-0"><strong>Email: </strong>{contact.email}</p> 
                            <p className="mb-0"><strong>Phone: </strong>{contact.phone}</p>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={() => deleteContact(contact.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}