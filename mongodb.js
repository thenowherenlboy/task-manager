// CRUD

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

// const { MongoClient, ObjectID } = require('mongodb');


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        return console.log('Something bad happened.');
    }

    const db = client.db(databaseName);

    db.collection('tasks').findOne( {_id: new ObjectID('5d2244938b22d50af4b9e8ad')},
    (error, doc) => {
        if (error) {
            return console.log('Oh snap! Unable to fetch document.');
        }
        console.log(doc);
    });

    db.collection('tasks').find( { completed: false}).toArray((error, array) => {
        if (error) {
            console.log('Unable to get tasks.');
        }
        console.log(array);
    });
});