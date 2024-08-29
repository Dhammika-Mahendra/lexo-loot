import { View, Text, TextInput } from 'react-native'
import React from 'react'

const SearchBar = () => {
  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius:5,
          marginBottom:10
        }}
        placeholder="Search"></TextInput>
    </View>
  )
}

export default SearchBar