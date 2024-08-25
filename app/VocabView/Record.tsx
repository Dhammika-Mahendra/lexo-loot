import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { textStyles } from '@/constants/TextStyles';

type RecordProps = {
    data: string;
};

const Record: React.FC<RecordProps> = ({ data }) => {
    return (
        <View style={styles.Record}>
            <Text style={textStyles.TitleBig} >{data}</Text>
        </View>
    );
};

export default Record

const styles = StyleSheet.create({
    Record: {
        flex: 1,
        backgroundColor:Colors.dark.background,
        marginBottom: 5,
        marginTop: 5,
    }
})