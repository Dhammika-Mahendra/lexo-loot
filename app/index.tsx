import { View,ScrollView, StyleSheet, Pressable, Text } from 'react-native'
import React, { useCallback, useEffect, useState} from 'react'
import SearchBar from './VocabView/SearchBar'
import { Colors } from '@/constants/Colors'
import { SplashScreen } from 'expo-router'
import { useFonts } from 'expo-font'
import { useSharedState } from '@/constants/Cntxt'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { IndexProps, record } from '@/constants/DataTypes'
import {fetchWords} from '@/constants/DataBase'
import { useFocusEffect } from '@react-navigation/native'
import Record from './VocabView/Record'

const Index : React.FC<IndexProps>= ({navigation}) => {

    //States and global vars
    const {word} = useSharedState()
    const [isLoading, setIsLoading] = useState(true)
    const [wordList, setWordList] = React.useState<record[]>([])

    const [fontsLoaded, error] = useFonts({
        "Roboto-Regular": require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
        "Roboto-Bold": require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
        "Roboto-Light": require('../assets/fonts/Roboto/Roboto-Light.ttf'),
        "Roboto-Black": require('../assets/fonts/Roboto/Roboto-Black.ttf'),
        "Roboto-Medium": require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
        "Roboto-Thin": require('../assets/fonts/Roboto/Roboto-Thin.ttf')
    })

    //initial rendering : fonts & splash screen
    useEffect(() => {
      if(error){throw new Error("Fonts not loaded")}
      if(fontsLoaded){SplashScreen.hideAsync()}
    },[fontsLoaded, error])

    if(!fontsLoaded && !error){return null}


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
    <View style={styles.container}>
    <SearchBar></SearchBar>
      <ScrollView>
        {isLoading ? <View><Text>Loading...</Text></View> :
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