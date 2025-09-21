const path = require('path');
const sqlite3 = require('sqlite3');
const {open} = require('sqlite');

const initDB = async function() {
    const db = await open({
        filename: path.join(__dirname, 'contactsBook.db'),
        driver: sqlite3.Database
    });
    createTableQuery = `create table if not exists contacts( id text not null primary key, name text not null, email text unique not null, phone text unique not null);`;
    await db.run(createTableQuery);
    return db;
}

module.exports = initDB;