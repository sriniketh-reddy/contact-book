import {useState, useEffect} from 'react';
import './index.css';
export default function Form(props) {
    const {fetchContacts} = props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [invalidName, setInvalidName] = useState(true);
    const [invalidEmail, setInvalidEmail] = useState(true);
    const [invalidPhone, setInvalidPhone] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if(!nameRegex.test(name)) {
            setInvalidName(true); 
        } else {
            setInvalidName(false);
        }  
    }, [name]);
    
    useEffect(() => {
        const emailRegex = /^\S+@\S+\.\S+$/
        if(!emailRegex.test(email)) {
            setInvalidEmail(true); 
        } else {
            setInvalidEmail(false);
        }  
    }, [email]);
    
    useEffect(() => {
        const phoneRegex = /^\d{10}$/
        if(!phoneRegex.test(phone)) {
            setInvalidPhone(true);
        } else {
            setInvalidPhone(false);
        }
    }, [phone]);

    const addConact = async (event) => {
        event.preventDefault();
        try{
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, phone})
            }
            const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/contacts/`, options);
            if (res.status === 201){
                setName(''); 
                setEmail(''); 
                setPhone('');
                setInvalidName(true);
                setInvalidEmail(true);
                setInvalidPhone(true);
                setError(null);
                fetchContacts();
            }
            else{
                const err = await res.text();
                if (err.includes("UNIQUE")){
                    setError("Contact with this email or phone number already exists");
                }
                else{
                    setError(err);
                }
            }
        }
        catch(e){
            setError(e.message);
        }
    }

    return (
    <div className='form-container col-md-6 mb-3 p-4'>
        <h2 className='text-center'>Add New Contact</h2>
        <form onSubmit={addConact} className="d-flex flex-column">
            <strong> <label htmlFor='name'>Name:</label> </strong>
            <input className="w-100 mb-2" type="text" id="name" placeholder="Name" value={name} required onChange={(e)=>{
                setName(e.target.value);
            }}/>
            <strong> <label htmlFor='email'>Email:</label> </strong> 
            <input className="w-100 mb-2" type="email" id="email" placeholder="Email" value={email} required onChange={async (e)=>{
                setEmail(e.target.value);
            }}/>
            <strong> <label htmlFor='phone'>Phone:</label> </strong> 
            <input className="w-100 mb-2" type="tel" id="phone" placeholder="Phone" value={phone} required onChange={async (e)=>{
                setPhone(e.target.value);
            }}/>
            {error && <p style={{color: 'red', fontSize: '12px'}}>{error}</p>}
            <button className="btn btn-primary align-self-center" type="submit" disabled={invalidName || invalidEmail || invalidPhone}>Add Contact</button>
        </form>
        <p className="mt-2 mb-0" style={{color: 'red', fontSize: '12px'}}>Note: Name should contain only alphabets and spaces. Phone number should be 10 digits long.</p>
    </div>
    );
}