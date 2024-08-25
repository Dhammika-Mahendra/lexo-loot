import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const add = () => {
  return (
    <View style={styles.container}>
      <Text>add</Text>
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