import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { TextInput } from 'react-native-gesture-handler'
import { useSharedState } from '@/constants/Cntxt'
import { useNavigation } from '@react-navigation/native'

const add = () => {
  const navigate=useNavigation()

  const {word, setWord} = useSharedState()

  const [newWord, setNewWord] = React.useState<string>('')
  const addWord = () => {
    setWord([...word, newWord])
    setNewWord('')
    navigate.navigate('index' as never)
  }

  return (
    <View style={styles.container}>
      <Text>Add new word</Text>
      <TextInput onChangeText={(e)=>setNewWord(e)}></TextInput>
      <Button title="Add" onPress={addWord}></Button>
    </View>
  )
}

export default add

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: Colors.light.background
    }
})