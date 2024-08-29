import { View, Text } from 'react-native'
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

export default RecordView