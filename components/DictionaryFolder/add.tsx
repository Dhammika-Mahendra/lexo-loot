import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { TextInput } from 'react-native-gesture-handler'
import { useSharedState } from '@/constants/Cntxt'
import { useNavigation } from '@react-navigation/native'
import { insertWord } from '@/constants/DataBase'
import { SafeAreaView } from 'react-native-safe-area-context'

const Add = () => {
  const navigate=useNavigation()

  const {word, setWord} = useSharedState()

  const [newWord, setNewWord] = React.useState<string>('')
   const addWord = () => {
    setWord([...word, newWord])
    setNewWord('')
    navigate.navigate('index' as never)
  } 

  const handleAddWord = (Word: string) => {
    insertWord(Word, (success) => {
      if (success) {
        console.log('Word added successfully');
        navigate.navigate('index' as never)
      } else {
        console.log('Failed to add word');
      }
    });
  };
  

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Add new word</Text>
        <TextInput onChangeText={(e)=>setNewWord(e)} style={styles.input}></TextInput>
        <Button title="Add" onPress={()=>handleAddWord(newWord)}></Button>
      </View>
    </SafeAreaView>
  )
}

export default Add

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: Colors.light.background
    },
    input:{
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius:5,
      marginBottom:10,
      marginTop:10
    }
})