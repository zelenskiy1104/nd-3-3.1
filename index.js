const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/nd-331';

MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log('Проблема с соединением с базой данных: ', err);
    }
    else {
        let collection = db.collection('school');

        let pupils = [
            {name: 'Semen', gender: 'm', age: 13},
            {name: 'Sergey', gender: 'm', age: 10},
            {name: 'Anna', gender: 'f', age: 13},
            {name: 'Michail', gender: 'm', age: 15},
            {name: 'Alena', gender: 'f', age: 11},
            {name: 'Andrey', gender: 'm', age: 13},
            {name: 'Katya', gender: 'f', age: 9},
            {name: 'Petr', gender: 'm', age: 16},
        ];

        collection.insert(pupils, (err, result) => {
            if (err) {
                console.log(err);
            }
            db.close();
        });

    }
});
