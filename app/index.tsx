import { View, Text, ScrollView, StyleSheet, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from './VocabView/SearchBar'
import Record from './VocabView/Record'
import { Colors } from '@/constants/Colors'
import { SplashScreen } from 'expo-router'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'

const index = () => {

    const navigation = useNavigation()

    const [fontsLoaded, error] = useFonts({
        "Roboto-Regular": require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
        "Roboto-Bold": require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
        "Roboto-Light": require('../assets/fonts/Roboto/Roboto-Light.ttf'),
        "Roboto-Black": require('../assets/fonts/Roboto/Roboto-Black.ttf'),
        "Roboto-Medium": require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
        "Roboto-Thin": require('../assets/fonts/Roboto/Roboto-Thin.ttf')
    })
    useEffect(() => {
        if(error){throw new Error("Fonts not loaded")}
        if(fontsLoaded){
            SplashScreen.hideAsync()
        }
    },[fontsLoaded, error])

    if(!fontsLoaded && !error){return null}

    const [word, setWord] = React.useState<string[]>(['abc','def','ghi','jkl','mno','pqr','stu','vwx','yz'])

  return (
    <View style={styles.container}>
    <SearchBar></SearchBar>
      <ScrollView>
        {
            word.map((item, index) => {
                return (
                    <Record key={index} data={item}></Record>
                )
            })
        }
      </ScrollView>
        <Pressable onPress={() => navigation.navigate('add' as never)}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </View>
        </Pressable>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: Colors.light.background
    },
    button:{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'lightblue',
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