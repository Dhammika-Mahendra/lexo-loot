import { View, Text, TextInput } from 'react-native'
import React from 'react'

const SearchBar = () => {
  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        placeholder="Search for a word"></TextInput>
    </View>
  )
}

export default SearchBar