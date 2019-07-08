// CRUD

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        return console.log('Something bad happened.');
    }
    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: 'Harley',
    //     age: 44
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops);
    // });
    // db.collection('users').insertMany( [
    //     {
    //         name: 'Mevs',
    //         age: 22
    //     }, {
    //         name: 'Gunther',
    //         age: 32
    //     }
    // ], (error, result) => {
    //     if(error) { return console.log('Unable to insert documents.');}
    //     console.log(result.ops);
    // } );

    db.collection('tasks').insertMany( [
        {
            name: 'Bake a cake',
            completed: false
        },
        {
            name: 'Rake leafs',
            completed: false
        },
        {
            name: 'Write a novella',
            completed: true
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents');
        }
        console.log(result.ops);
    });
});