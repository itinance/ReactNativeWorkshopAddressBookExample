import SQLite from 'react-native-sqlite-storage'

import {Alert} from 'react-native'

SQLite.DEBUG();
//SQLite.enablePromise(false);

let db = null;

function errorCB(err) {
    __DEV__ && console.log("*** SQL Error: ", err);
}
  
function successCB() {
    __DEV__ && console.log("*** SQL executed fine");
}
  
function openCB() {
    __DEV__ && console.log("*** Database OPENED");
}

const READONLY = true;

/**
 * Start a transaction / readonly-transaction depending on readOnly-flag
 * 
 * @param {boolean} readOnly 
 */
function startTransaction(readOnly : boolean = false) {
    return new Promise( (resolve, reject) => {
        try {
            readOnly ? 
                db.readTransaction( tx => resolve(tx) )
                :
                db.transaction( tx => resolve(tx) );
        }
        catch(err) {
            reject(err);
        }
    })
}

/**
 * 
 * @param object tx 
 * @param string sql 
 * @param Array<object> params 
 */
function executeSql(tx : object, sql : string, params : Array<object> = []) : Promise {
    return new Promise( (resolve, reject) => {
        try {
            console.log("SQL: ", sql, params)
            tx.executeSql(sql, params, 
                (tx, res) => {
                    //console.log("After execute:", res)
                    resolve({tx, res})
                },
                err => reject(err)
            )
        }
        catch(err) {
            reject(err);
        }
    })
}

export async function openDatabase() {
    try {
        return new Promise( (resolve, reject) => {
            db = SQLite.openDatabase("testDB_02", "1.0", "Test Database", 200000, openCB, errorCB);

            startTransaction()
            .then( tx => executeSql(tx, `
CREATE TABLE IF NOT EXISTS address (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    firstname TEXT NULL DEFAULT NULL,
    lastname TEXT NULL DEFAULT NULL,
    street TEXT NULL DEFAULT NULL,
    plz TEXT NULL DEFAULT NULL
)
`, []))
            .then( ({res}) => {
                resolve(true);
            })
            .catch( err => {
                reject(err)
            })
        })    
    }
    catch(err) {
        console.log("#################################")
        console.log(err);
        console.log("#################################")
    }
}

export function closeDatabase() {
    SQLite.closeDatabase()
}

/**
 * Create a new address record.
 * 
 * @param {object} address 
 * @return {success: boolean, id: number}
 */
export function insertAddress(address) {
    const params = [
        address.firstname,
        address.lastname,
        address.street,
        address.plz
    ];

    return startTransaction()
    .then( tx => executeSql(tx, `
        INSERT INTO address (firstname, lastname, street, plz) VALUES (?, ?, ?, ?)
        `, params ) )
    .then( ({res}) => {
        return {
            success: res.insertId > 0,
            id: res.insertId
        }
    });
}

export function deleteAddress(id) {
    return startTransaction()
    .then( tx => executeSql(tx, 'DELETE FROM address WHERE id=?', [id] ) )
    .then( Promise.resolve(true) )
}

export function updateAddress(address) {
    const params = [
        address.firstname,
        address.lastname,
        address.street,
        address.plz,
        address.id
    ];

    return startTransaction()
    .then( tx => executeSql(tx, `
        UPDATE address SET firstname=?, lastname=?, street=?, plz=? WHERE id=?
        `, params ) )
    .then( ({res}) => {
        console.log("AFTER Update", res)
        return {success: res.rowsAffected > 0};
    })
}

export function loadAddresses( mapBy = null ) {
    return startTransaction( READONLY )
    .then( tx => executeSql( tx, 'SELECT * FROM address', [] ))
    .then( ({res}) => {
        if(typeof res.rows === 'object') {
            return _readRowsFromDbResultAsArray(res.rows, mapBy)
        }
        return []
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
