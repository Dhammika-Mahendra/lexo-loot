import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RecordViewProps } from '@/constants/DataTypes'
import HeadComp from './Header/HeadComp'
import { SafeAreaView } from 'react-native-safe-area-context'

const RecordView :React.FC<RecordViewProps>= ({route}) => {

  const {elem} = route.params
  const {nav} = route.params

  return (
    <SafeAreaView>
      <View>
        <HeadComp id={elem.id} navigation={nav}></HeadComp>
        <Text>Id:{elem.id}</Text>
        <Text>This is {elem.word}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  iconsContainer: {
    width:100,
    height:50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    top: -20,
    right: 10,
    zIndex:10
  }
});

export default RecordView