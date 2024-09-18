/* import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React from 'react'
import { RecordViewProps } from '@/constants/DataTypes'
import HeadComp from './Header/HeadComp'
import { SafeAreaView } from 'react-native-safe-area-context'
import { editWordById } from '@/constants/DataBase'

const RecordView :React.FC<RecordViewProps>= ({route,navigation}) => {

  const {elem} = route.params
  const {nav} = route.params

  const [editmode,setEditMode] = React.useState<boolean>(false);
  const [text,setText] = React.useState<string>(elem.word);

  const handleEditWord = (Id: number, value : string) => {
    editWordById(Id, value, (success) => {
      if (success) {
        console.log('Success');
        navigation.navigate('index' as never);
      } else {
        console.log('Fail');
      }
    });
  }

  return (
    <SafeAreaView>
      <View>
        <HeadComp id={elem.id} navigation={nav} seteditMode={setEditMode} editMode={editmode}></HeadComp>
        {!editmode ?
          <View>
            <Text>Id:{elem.id}</Text>
            <Text>This is {elem.word}</Text>
          </View>:
          <View>
            <TextInput value={text} onChangeText={(e)=>setText(e)} style={styles.inputStyle}></TextInput>
            <Button title="Save" onPress={()=>handleEditWord(elem.id,text)}></Button>
          </View>
          }
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

export default RecordView */