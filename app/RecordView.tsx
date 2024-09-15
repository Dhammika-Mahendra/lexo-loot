import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RecordViewProps } from '@/constants/DataTypes'

const RecordView :React.FC<RecordViewProps>= ({route}) => {

  const {word} = route.params

  return (
    <View>
      <Text>This is {word}</Text>
    </View>
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