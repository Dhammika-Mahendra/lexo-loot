import * as SQLite from 'expo-sqlite/legacy';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Record } from './DataTypes';


// First Method ========================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  export const db = SQLite.openDatabase('sampleDB.db');

  
  export const initializeDatabase = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT)'
        );
      }, (error) => {
        console.log('Error creating table:', error);
        reject(error);
      }, () => {
        console.log('Table created successfully');
        resolve();
      });
    });
  }
 

  export const clearAndPopulateDatabase = (sampleWords: string[]): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        // Clear existing records
        tx.executeSql('DELETE FROM records');
  
        // Insert sample words
        sampleWords.forEach(item => {
          tx.executeSql('INSERT INTO records (word) VALUES (?)', [item]);
        });
      }, (error) => {
        console.log('Error populating database:', error);
        reject(error);
      }, () => {
        console.log('Database populated successfully');
        resolve();
      });
    });
  };
  

  export const fetchWords = (): Promise<Record[]> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM records', [], (_, { rows }) => {
          console.log('Fetched words:', JSON.stringify(rows._array));
          resolve(rows._array);
        });
      }, (error) => {
        console.log('Error fetching words:', error);
        reject(error);
      });
    });
  };


