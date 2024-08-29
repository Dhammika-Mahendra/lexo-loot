/* import { SQLiteDatabase, openDatabase, enablePromise } from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'sampleDB.db', location: 'default' });
};

export const getNames = async (db: SQLiteDatabase): Promise<{ id: number; word: string }[]> => {
    try {
      console.log('Fetching data from database...');
      const results = await db.executeSql('SELECT id, word FROM records');
      const names: { id: number; word: string }[] = [];
      
      results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
          const item = result.rows.item(i);
          names.push({ id: item.id, word: item.word });
        }
      });
      console.log('results fetched');
      
      return names;
    } catch (error) {
      console.error('Failed to fetch data from database:', error);
      return [];
    }
  };
   */