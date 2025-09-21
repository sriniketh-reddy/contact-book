const express = require('express');
const cors = require('cors');
const initDB = require('./db.js');
const {v4, validate} = require('uuid');
let db = null;

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
    try{
        db = await initDB();
        app.listen(5000, () => {
            console.log(`Server Running`);
        });
    }
    catch(e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
}

startServer();

const validateReq = (req, res, next) => {
    const {name, email, phone} = req.body;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    if(name === undefined || email === undefined || phone === undefined) {
        res.status(400).send("Invalid Request");
    }
    else if(name.length < 3) {
        res.status(400).send("Name is too short");
    }   
    else if(!nameRegex.test(name)) {
        res.status(400).send("Name is not valid");
    }
    else if(!emailRegex.test(email)) {
        res.status(400).send("Email is not valid");
    }
    else if(!phoneRegex.test(phone)) {
        res.status(400).send("Phone number is not valid");
    }
    else{
        next();
    }
}

app.post("/contacts/", validateReq, async (req, res) => {
    try{
        const {name, phone, email} = req.body;
        const insertContactQuery = `insert into contacts(id, name, email, phone) values ('${v4()}', '${name}', '${email}', '${phone}');`;
        await db.run(insertContactQuery);
        res.status(201).send("Contact Added Successfully");
    }
    catch(e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

app.get("/contacts/", async (req, res) => {
    try{
        const {limit="", page=""} = req.query;
        const offset = (parseInt(page) - 1) * limit;
        const getContactsQuery = `select * from contacts limit ${limit} offset ${offset};`;
        const contactsArray = await db.all(getContactsQuery);
        res.send(contactsArray);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
});

app.delete("/contacts/:contactId/", async (req, res) => {
    try{
        const {contactId} = req.params;
        const deleteContactQuery = `delete from contacts where id='${contactId}';`;
        await db.run(deleteContactQuery);
        res.status(204).send("Contact Deleted Successfully");
    }
    catch(e) {
        res.status(400).send(e.message);
    }
});