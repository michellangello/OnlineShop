// var ObjectID = require('mongodb').ObjectID;
// var database = require('../config/db');
// var User = require('../schemas/user').User;

// const usersCollection = 'users';

// function UserException(message) {
//     this.message = message;
//     this.name = "Исключение, определенное пользователем";
// }


// const addUser = async (user) => {
//     var db = await database.connect();
//     return await db.collection(usersCollection).insertOne(user).catch(error=> {
//         throw new UserException(error);
//     }) 
// }

// const getUsers = async () => {
//     var db = await database.connect();
//     return await db.collection(usersCollection).find().toArray().catch(error => {
//         throw new UserException(error);
//     });
// }


// const getSingleUser = async (id) => {
//     const details = {
//         '_id': new ObjectID(id)
//     };

//     try {
//         var db = await database.connect();
//         return await db.collection(usersCollection).findOne(details).catch(err => {
//             // console.log(err.);
//             throw new UserException(err);
//         });
//     } finally {
//         await database.close();
//     }
// }



// module.exports = {
//     addUser,
//     getSingleUser,
//     getUsers,
// };