import { View, TextInput, Pressable } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useSharedState } from '@/constants/Cntxt';

const SearchBar = () => {

  const {setModalVisible} = useSharedState()

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight:5,
      paddingLeft:5,
    }}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius:5,
          marginBottom:10,
        }}
        placeholder="Search"></TextInput>
      <View>
        <Pressable onPress={()=>setModalVisible(true)}>
          <Feather name="filter" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  )
}

export default SearchBar