import * as SQLite from 'expo-sqlite/legacy';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';


// First Method ========================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  export const db = SQLite.openDatabase('sampleDB.db');

  // Create the table
  export const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT);'
      );
    });
  }

  // Insert a record
  export const insertRecord = (word: string, callback?: () => void) => {
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO records (word) VALUES (?)', [word] , () => {
        if (callback) {
          callback();
        }
      },(error):boolean => {
        console.error('Error inserting record: ', error);
        return false
      });
    });
  }

  //return all records to an array
  export const getRecords = (callback?: () => void) => {
    let records: string[] = [];
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM records', [], (_, { rows }) => {
        for (let i = 0; i < rows.length; i++) {
          records.push(rows.item(i).word);
        }
        if (callback) {
          callback();
        }
      });
    });
    console.log(JSON.stringify(records));
    return records;
  };


  export const deleteAllRecords = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM records', [], () => {
        console.log('All records deleted successfully.');
      }, (error): boolean => {
        console.error('Error deleting records: ', error);
        return false;
      });
    });
  };



// Second Method ========================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


/*   const databaseName = 'sampleDB.db';
  
  async function openDatabase() {
    const dbFileUri = `${FileSystem.documentDirectory}${databaseName}`;
  
    // Check if the database already exists in the local file system
    const fileExists = await FileSystem.getInfoAsync(dbFileUri);
  
    if (!fileExists.exists) {
      // Copy the database from the assets to the local file system
      await FileSystem.downloadAsync(
        Asset.fromModule(require(`./assets/${databaseName}`)).uri,
        dbFileUri
      );
    }
  
    // Open the database
    return SQLite.openDatabase(databaseName);
  }

  export default openDatabase; */