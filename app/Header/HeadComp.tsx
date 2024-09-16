import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { HeaderProps } from '@/constants/DataTypes';
import { deleteWordById } from '@/constants/DataBase';
import Ionicons from '@expo/vector-icons/Ionicons';

const HeadComp:React.FC<HeaderProps> = ({id,navigation}) => {

    const handleDeleteWord = (Id: number) => {
        deleteWordById(Id, (success) => {
          if (success) {
            console.log('Success');
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
        <Pressable onPress={()=>handleDeleteWord(id)}>
            <AntDesign name="delete" size={24} color="black" />
        </Pressable>
    </View>
  )
}

export default HeadComp


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
})