import { View,ScrollView, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState} from 'react'
import SearchBar from './VocabView/SearchBar'
import Record from './VocabView/Record'
import { Colors } from '@/constants/Colors'
import { SplashScreen } from 'expo-router'
import { useFonts } from 'expo-font'
import { useSharedState } from '@/constants/Cntxt'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { IndexProps } from '@/constants/DataTypes'
import { createTable, db, deleteAllRecords, getRecords, insertRecord } from '@/constants/DataBase'

const Index : React.FC<IndexProps>= ({navigation}) => {

    //Data taken from global context
    const {word} = useSharedState()


    const [fontsLoaded, error] = useFonts({
        "Roboto-Regular": require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
        "Roboto-Bold": require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
        "Roboto-Light": require('../assets/fonts/Roboto/Roboto-Light.ttf'),
        "Roboto-Black": require('../assets/fonts/Roboto/Roboto-Black.ttf'),
        "Roboto-Medium": require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
        "Roboto-Thin": require('../assets/fonts/Roboto/Roboto-Thin.ttf')
    })

    interface Record {
        id: number;
        word: string;
      }

    const [wordList, setWordList] = React.useState<Record[]>([])

              // Add sample data
    const sampleWords = [
        'DEF',
        'GHI',
        'MNO',
        'PQR',
        'STU'
    ];
      
    const fetchWords = () => {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM records', [], (_, { rows }) => {
            setWordList(rows._array);
            console.log(JSON.stringify(rows._array));
          });
        });
      }

    useEffect(() => {
        if(error){throw new Error("Fonts not loaded")}
        if(fontsLoaded){
            SplashScreen.hideAsync()
        }

        db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT)'
            );
          });   
    
          db.transaction(tx => {
            // Clear existing records
            tx.executeSql('DELETE FROM records');
      
            // Insert sample words
            sampleWords.forEach(item => {
              tx.executeSql('INSERT INTO records (word) VALUES (?)', [item]);
            });
          }, (error) => {
            console.log('Transaction error: ', error);
          }, () => {
            console.log('Transaction completed');
            fetchWords();
          });

    console.log('use effect');
    },[fontsLoaded, error])

    if(!fontsLoaded && !error){return null}

  return (
    <View style={styles.container}>
    <SearchBar></SearchBar>
      <ScrollView>
        {
            wordList.map((item, index) => {
                return (
                    <Record key={index} word={item.word} navigation={navigation}></Record>
                )
            })
        }
      </ScrollView>
        <Pressable onPress={() => navigation.navigate('add' as never)}>
            <View style ={styles.button}>
            <FontAwesome6 name="add" size={24} color="white" />
            </View>
        </Pressable>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: Colors.main.background
    },
    button:{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Colors.main.add,
        padding: 10,
        width: 50, 
        height: 50,
        borderRadius: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    ,
    buttonText:{
        fontSize: 40
    }
})