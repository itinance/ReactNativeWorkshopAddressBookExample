import SQLite from 'react-native-sqlite-storage'

SQLite.enablePromise(true);

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
  

export function openDatabase() {
    try {

        return new Promise( (resolve, reject) => {

            SQLite.openDatabase("test.db", "1.0", "Test Database", 200000, openCB, errorCB)
            .then( (_db)=> {
                db = _db;
                return _db;
            }).then( db => {
                console.log(0, db)
                return db.transaction()
            }).then( tx => {
                console.log(1, tx)
            })

            /*console.log(2, db);
            db.transaction()
                .then( tx => {
                    console.log(1, tx)
                })*/

            return resolve();
        
            return db.transaction( tx => {
/*                return tx.executeSql(
                    "insert into address(firstname, lastname, street) values ('Erik', 'KOrt', 'Hofgasse 1');"
                , [], 
                (tx, a,b) => resolve(tx,a,b), 
                (err) => reject(err) 
                ) */

                return tx.executeSql( `
                CREATE TABLE IF NOT EXISTS address (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    firstname TEXT NULL DEFAULT NULL,
                    lastname TEXT NULL DEFAULT NULL,
                    street TEXT NULL DEFAULT NULL
                )`, [], 
                (tx, a,b) => resolve(tx,a,b), 
                (err) => reject(err) 
                )        
            })
        })    
    }
    catch(err) {
        console.log(err);
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
