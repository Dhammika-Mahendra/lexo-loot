import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HeaderProps } from '@/constants/DataTypes';
import { deleteWordById } from '@/constants/DataBase';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const RecordViewHeader:React.FC<HeaderProps> = ({id,navigation,seteditMode,editMode}) => {

    const handleDeleteWord = (Id: number) => {
        deleteWordById(Id, (success) => {
          if (success) {
            console.log('Success');
            navigation.navigate('index' as any)
          } else {
            console.log('Fail');
          }
        });
      };

  return (
    <View style={styles.container}>
        <Pressable onPress={()=>navigation.navigate('index' as never)}>
            <Ionicons name="arrow-back" size={24} color="black"/>
        </Pressable>
        <View style={styles.iconContainer}>
          <Pressable onPress={()=>seteditMode(true)}>
              <MaterialIcons name="edit" size={24} color={editMode?'white':'black'} />
          </Pressable>
          <Pressable onPress={()=>handleDeleteWord(id)}>
              <MaterialCommunityIcons name="delete-outline" size={24} color="black" />
          </Pressable>
        </View>
    </View>
  )
}

export default RecordViewHeader


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        padding: 5,
        backgroundColor: Colors.header.background,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconContainer: {
        width: '30%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})