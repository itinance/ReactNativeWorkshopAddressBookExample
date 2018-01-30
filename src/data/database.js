import SQLite from 'react-native-sqlite-storage'

import {Alert} from 'react-native'

SQLite.DEBUG();
//SQLite.enablePromise(false);

let db = null;

function errorCB(err) {
    console.log("SQL Error: " + err);
}
  
function successCB() {
    console.log("SQL executed fine");
}
  
function openCB() {
    console.log("Database OPENED");
}
  
function __promisify( func ) {
    return new Promise( (resolve, reject) => {
        try {
            func( tx => resolve(tx) );
        }
        catch(err) {
            reject(err);
        }
    })
}

function startTransaction() {
    return new Promise( (resolve, reject) => {
        try {
            console.log("In StartTransaction")
            db.transaction( tx => {
                    console.log("CALLBACK", tx)
                    resolve(tx) 
                }
            );
        }
        catch(err) {
            reject(err);
        }
    })
}

function executeSql(tx, sql, params = []) {
    return new Promise( (resolve, reject) => {
        try {
            return tx.executeSql(sql, params, 
                (tx, res) => resolve({tx, res}),
                err => reject(err)
            )
        }
        catch(err) {
            reject(err);
        }
    })
}

function errorCB(err) {
    console.log("SQL Error: " + err);
};
  
function successCB() {
    console.log("SQL executed fine");
};
  
function openCB() {
    console.log("Database OPENED");
};

export async function openDatabase() {
    try {
        console.log("openDatabase")
        return new Promise( async (resolve, reject) => {

            console.log("openDatabase in Promise")

            //db = SQLite.openDatabase({name : "testDB", createFromLocation : 1})
            db = SQLite.openDatabase("testDB", "1.0", "Test Database", 200000, openCB, errorCB);

            startTransaction()
            .then( tx => executeSql(tx, `
CREATE TABLE IF NOT EXISTS address (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    firstname TEXT NULL DEFAULT NULL,
    lastname TEXT NULL DEFAULT NULL,
    street TEXT NULL DEFAULT NULL
)
`, [])
            ).then( startTransaction )
            .then( tx => {
                return executeSql(tx, 'SELECT * FROM address')
            })
            .then( ({res}) => {
                console.log(2, res)
                console.log(3, res.rows.length)

                resolve(res)
            })

        })    
    }
    catch(err) {
        console.log("#################################")
        console.log(err);
        console.log("#################################")
    }
}

export async function closeDatabase() {
    await SQLite.closeDatabase()
}

export async function insertAddress(address) {

    const params = [
        address.firstname,
        address.lastname,
        address.street,
    ];

    await db.transaction( tx => {
        return tx.executeSql( `
INSERT INTO address (firstname, lastname, street) VALUES (?, ?, ?)
`, params )
    })

}

export async function deleteAddress(id) {
    await db.transaction( tx => {
        return tx.executeSql( `
DELETE FROM address WHERE id=?
`, [id] )
    })
}

export async function updateAddress(address) {
    const params = [
        address.firstname,
        address.lastname,
        address.street,
        address.id
    ];

    await db.transaction( tx => {
        return tx.executeSql( `
UPDATE address SET firstname=?, lastname=?, street=? WHERE id=?
`, params )
    })
}

export function loadAddresses() {
    return new Promise( (resolve, reject) => {
        return db.readTransaction( tx => {
            return tx.executeSql( 'SELECT * FROM address', [], (tx, {rows}) => {
                if(rows.length == 0) resolve([])
                resolve( _readRowsFromDbResultAsArray(rows) );
            })
        })
    })   
}

function _readRowsFromDbResultAsArray( rows, mapBy = null ) : array {
    try {
        let len = rows.length,
             result = [];
        for (let i = 0; i < len; i++) {
            let row = rows.item(i);
            if(mapBy) {
                result[row[mapBy]] = row;
            } else {
                result.push( row );
            }
        }
        return result;
    } catch(e) {
        console.log('_readRowsFromDbResultAsArray', e);
        return [];
    }
}
