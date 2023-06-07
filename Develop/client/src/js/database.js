// this file is for creating the database and handling the CRUD operations.
// here we only need put and get operations.


import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { console.error('putDb not implemented');
console.log(content, "content posted to the database");

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('jate', 1);


// Create a new transaction and specify the database and data privileges.
const transaction = contactDb.transaction('jate', 'readwrite');

// Open up the desired object store.
const store = transaction.objectStore('jate');

// Use the .add() method on the store and pass in the content.
  const request = store.add({ content });

// Get confirmation of the request.
const result = await request;
console.log('🚀 - data saved to the database', result);
};
;









// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
