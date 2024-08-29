import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { textStyles } from '@/constants/TextStyles';
import { RecordProps } from '@/constants/DataTypes';

const Record: React.FC<RecordProps> = ({word,navigation}) => {

    return (
        <Pressable onPress={()=>navigation.navigate('RecordView',{word})} >
            <View style={styles.Record}>
                <Text style={textStyles.recordTitle} >{word}</Text>
            </View>
        </Pressable>
    );
};

export default Record

const styles = StyleSheet.create({
    Record: {
        flex: 1,
        backgroundColor:Colors.main.recordBG,
        marginBottom: 5,
        marginTop: 5,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft: 10,
        borderColor: Colors.main.recordBorder,
        borderWidth: 1,
    }
})