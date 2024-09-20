import { View,ScrollView, StyleSheet, Pressable, Text } from 'react-native'
import React, { useCallback, useEffect, useState} from 'react'
import SearchBar from './../VocabView/SearchBar'
import { Colors } from '@/constants/Colors'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { IndexProps, record } from '@/constants/DataTypes'
import {fetchWords} from '@/constants/DataBase'
import { useFocusEffect } from '@react-navigation/native'
import Record from './../VocabView/Record'
import { SafeAreaView } from 'react-native-safe-area-context'

const Index : React.FC<IndexProps>= ({navigation}) => {

    //States and global vars
    const [isLoading, setIsLoading] = useState(true)
    const [wordList, setWordList] = React.useState<record[]>([])


    //Fetch words from database 
    //a usecallback is used to stop function from being recreated on every render
    const renderWords = useCallback(async() => {
      try {
        setIsLoading(true)
        console.log("Fetching words...")
        const words = await fetchWords()
        console.log("Words fetched") 
        setWordList(words)
        setIsLoading(false)
      } catch (error) {
        console.error('Error setting up database:', error)
        setIsLoading(false)
      }
    },[])

    //Fetch words on screen focus
    useFocusEffect(
      useCallback(() => {
        renderWords()
      }, [renderWords])
    )


  return (
    <SafeAreaView>
      <View style={styles.container}>
      <SearchBar></SearchBar>
        <ScrollView>
          {isLoading ? <View><Text>Loading...</Text></View> :
              wordList.map((item, index) => {
                  return (
                      <Record key={index} element={item} navigation={navigation}></Record>
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
    </SafeAreaView>
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