/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import {Realm} from '@realm/react'

// Declare User Schema
class Users extends Realm.Object {
    static schema = {
        name: 'Users',
        primaryKey: 'username',
        properties: {
            username: 'string',
            firstname: 'string',
            lastname: 'string?',
            password: 'string',
            age: 'int?',
        },
    }
}

// Create realm
let realm = new Realm({schema: [Users], schemaVersion: 4})

// Functions
// Return alll users
let getAllUsers = () => {
    return realm.objects('Users');
}

// Add an user
let addUser = (username: string, firstname: string, lastname: string | null = null, password: string | null = null, age: number | null = null) => {
    realm.write(() => {
        const user = realm.create('Users', {
            username: username,
            firstname: firstname,
            lastname: lastname,
            password: password,
            age: age,
        })
    })
}

// Get user by username
let getUser = (username: string) => {
    console.log(username);
    console.log('username =' + username);
    return realm.objects('Users').filtered("username == $0", username)
}

export default realm

export {
    addUser,
    getUser,
    getAllUsers
}