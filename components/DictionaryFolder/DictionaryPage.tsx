import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackProps } from '@/constants/DataTypes';
import FilterModal from './../VocabView/FilterModal';
import index from './index';
import RecordView from './RecordView';
import Add from './add';
import { clearAndPopulateDatabase, initializeDatabase } from '@/constants/DataBase';

const Stack = createStackNavigator<RootStackProps>();

const DictionaryPage = () => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

  const sampleWords = ['DEF','GHI','MNO','PQR','STU']
    
  const dbSetup = async () => {
    try {
      setIsLoading(true)
      console.log("Initializing database...")
      await initializeDatabase()
      console.log("Database initialized")
      console.log("Clearing and populating database...")
      await clearAndPopulateDatabase(sampleWords)
      console.log("Database populated")
      setIsLoading(false)
    } catch (error) {
      console.error('Error setting up database:', error)
      setIsLoading(false)
    }
  }

    dbSetup();

  }, []);


  return (
    <>
      {isLoading ? <Text>Loading...</Text>:            
        <Stack.Navigator>
            <Stack.Screen name="index" component={index} options={{headerShown:false}}/>
            <Stack.Screen name="add" component={Add} options={{headerStyle:{height:50}}}/>
            <Stack.Screen name="RecordView" component={RecordView} options={{headerShown:false}}/>
        </Stack.Navigator>}
      <FilterModal></FilterModal>
    </>
  )
}

export default DictionaryPage

