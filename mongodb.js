
// const mongodb = require('mongodb')

const { MongoClient, ObjectId } = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017'
const dataase = 'task-manager'

const id = new ObjectId()

console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {

    if(error) {
        console.log("Unable to connect to database", error)
    } 

   const db = client.db(dataase)

   db.collection('users').deleteOne({ 
       age: 21
   }).then((result) => {
       console.log("Successful delete")
   }).catch(err => {
        console.log("Unable to delete", err)
   })

//    db.collection('users').insertMany([{ 
//        name: 'Ali',
//        age: 30
//    },{ 
//        name: 'Sami',
//        age: 23
//    },{ 
//        name: 'Saeed',
//        age: 21
//    }], (err, result) => {
//        if(err) {
//            return console.error('Unable to insert user')
//        }

//        console.log(result)
//    })


// db.collection('tasks').insertMany([
//     {
//         description: 'jonas javascript course',
//         completed: true
//     },
//     {
//         description: 'jonas nodejs course',
//         completed: false
//     },
//     {
//         description: 'Andrew NodeJS course',
//         completed: false
//     }
// ], (err, result) => {
//     if (err) {
//         console.log('Unable to insert tasks');
//     }

//     console.log(result)
// })


// db.collection('tasks').deleteMany({completed: false}, (err, result) => {
//     if (error) {
//                     console.log('not deleted')
//                 }

//         console.log('succefull deleted')
// })


 })
