import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useEffect } from 'react'
import { RecordViewProps } from '@/constants/DataTypes'
import { SafeAreaView } from 'react-native-safe-area-context'
import { editWordById } from '@/constants/DataBase'
import RecordViewHeader from '../Header/RecordViewHeader'
import { textStyles } from '@/constants/TextStyles'

const RecordView :React.FC<RecordViewProps>= ({route,navigation}) => {

  const {elem} = route.params
  const {nav} = route.params

  const [editmode,setEditMode] = React.useState<boolean>(false);
  const [text,setText] = React.useState<string>(elem.word);

/*   const handleEditWord = (Id: number, value : string) => {
    editWordById(Id, value, (success) => {
      if (success) {
        console.log('Success');
        navigation.navigate('index' as never);
      } else {
        console.log('Fail');
      }
    });
  } */

  useEffect(()=>{
    if(editmode){
      navigation.navigate('add',{elem:elem})
    }
  },[editmode])

  return (
    <SafeAreaView>
        <RecordViewHeader id={elem.id} navigation={nav} seteditMode={setEditMode} editMode={editmode}></RecordViewHeader>
          <View>
            <Text>Id:{elem.id}</Text>
            <Text style={textStyles.recordTitle} >{elem.word}</Text>
            <Text style={textStyles.recordSubtitle} >{elem.meaning}</Text>
            <Text style={textStyles.recordSubtitle} >{elem.category}</Text>
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
  },
  inputStyle: {
    marginBottom: 10,
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:5,
  }
});

export default RecordView