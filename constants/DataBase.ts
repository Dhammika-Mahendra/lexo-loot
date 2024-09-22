import * as SQLite from 'expo-sqlite/legacy';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { record } from './DataTypes';
import { NavigationProp } from '@react-navigation/native';


// First Method ========================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  export const db = SQLite.openDatabase('sampleDB.db');

  
  export const initializeDatabase = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS records2 (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT , meaning TEXT, category TEXT);'
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
 
  type sampleW = {word:string,meaning:string,category:string}[]

  export const clearAndPopulateDatabase = (sampleWords: sampleW): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        // Clear existing records
        tx.executeSql('DELETE FROM records2');
  
        // Insert sample words
        sampleWords.forEach(item => {
          tx.executeSql('INSERT INTO records2 (word, meaning, category) VALUES (?, ?, ?)', 
          [item.word, item.meaning, item.category]);
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
  

  export const showId = (navigation: NavigationProp<any>,id: number): void => {
    console.log('ID:', id);
  }

  export const fetchWords = (): Promise<record[]> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM records2', [], (_, { rows }) => {
          resolve(rows._array);
        });
      }, (error) => {
        console.log('Error fetching words:', error);
        reject(error);
      });
    });
  };


  type itm = {word:string,meaning:string,category:string}

  export const insertWord = (item: itm, callback: (success: boolean) => void): void => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO records2 (word,meaning, category) VALUES (?, ?, ?)',
        [item.word,item.meaning,item.category],
        (_, result) => {
          console.log('Word inserted successfully:');
          callback(true);
        },
        (_, error) => {
          console.log('Error inserting word:', error);
          callback(false);
          return false;
        }
      );
    });
  };


  export const deleteWordById = (id: number, callback: (success: boolean) => void): void => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM records2 WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log('Word deleted successfully. ID:', id);
            callback(true);
          } else {
            console.log('No word found with ID:', id);
            callback(false);
          }
        },
        (_, error) => {
          console.log('Error deleting word:', error);
          callback(false);
          return false;
        }
      );
    });
  };

  export const editWordById = (id: number, item:itm, callback: (success: boolean) => void): void => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE records2 SET word = ?, meaning = ?, category = ? WHERE id = ?',
        [item.word, item.meaning, item.category, id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log('Word updated successfully. ID:', id);
            callback(true);
          } else {
            console.log('No word found with ID:', id);
            callback(false);
          }
        },
        (_, error) => {
          console.log('Error updating word:', error);
          callback(false);
          return false;
        }
      );
    });
  };