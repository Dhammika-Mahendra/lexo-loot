import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { textStyles } from '@/constants/TextStyles';
import { RecordProps } from '@/constants/DataTypes';

const Record: React.FC<RecordProps> = ({element,navigation}) => {

    return (
        <Pressable onPress={()=>navigation.navigate('RecordView',{elem:element,nav:navigation})} >
            <View style={styles.Record}>
                <Text style={textStyles.recordTitle} >{element.word}</Text>
                <Text style={textStyles.recordSubtitle} >{element.category}</Text>
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