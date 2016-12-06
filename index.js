const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/nd-331';

function dump(collection) {
    collection.find({}).toArray((err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('=======================================');
        result.forEach((item) => console.log(item));
    });
}

MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log('Проблема с соединением с базой данных: ', err);
        return;
    }

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

    // вставляем учеников в школу
    collection.insert(pupils, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('pupils was inserted');

        // выберем только учеников, которые старше 12 лет
        collection.find({age : {$gt: 12}}, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            dump(collection);

            // увеличим возраст учеников на 1
            collection.update({}, {$inc: {age: 1}}, {multi: true}, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                dump(collection);

                // удаляем все данные из коллекции
                collection.remove();

                // закрываем соединение
                db.close();
            });
        });
    });
});
