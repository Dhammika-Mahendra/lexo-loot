import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { TextInput } from 'react-native-gesture-handler'

const add = () => {
  return (
    <View style={styles.container}>
      <Text>Add new word</Text>
      <TextInput></TextInput>
      <Button title="Add"></Button>
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