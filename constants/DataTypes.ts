import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react"

//Context API data types =============================================================
export type RecordSet=string[]

export interface MyDataContextType{
    word: RecordSet;
    setWord: React.Dispatch<React.SetStateAction<RecordSet>>;
    modalVisible:boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

//Database data types =============================================================

//Record
export interface Record{
    id:number;
    word:string;
}


//Navigation data types =============================================================

//Stack screens
export interface RootStackProps{
    index:undefined;
    add:undefined;
    RecordView:{word:string};
    [key: string]: undefined | object;
}

//Index.home screen
export interface IndexProps{
    navigation:StackNavigationProp<RootStackProps, 'index'>;
}

//Record component
export interface RecordProps{
    word: string;
    navigation:StackNavigationProp<RootStackProps, 'index'>;
}


//Record view screen
export interface RecordViewProps{
    route:RouteProp<RootStackProps, 'RecordView'>;
}





