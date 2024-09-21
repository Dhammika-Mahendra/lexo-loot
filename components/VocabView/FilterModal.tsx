import { View, Text, Modal, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useSharedState } from '@/constants/Cntxt'
import { Colors } from '@/constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';

const FilterModal = () => {

  const {modalVisible, setModalVisible} = useSharedState()

  return (
    <Modal visible={modalVisible} transparent={true} onRequestClose={()=>setModalVisible(false)}
        animationType='slide'
    >
      <View style={styles.container}>
        <View style={styles.popup}>
            <Pressable onPress={()=>setModalVisible(false)}>
                <AntDesign name="close" size={20} color="black" style={styles.close}/>
            </Pressable>
            <Text>Filter Modal</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popup:{
        width: '90%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop:22,
        borderColor:Colors.main.recordBorder,
        borderWidth:1
    },
    close:{
        position: 'absolute',
        top: -20,
        right: 5,
    }
})
export default FilterModal