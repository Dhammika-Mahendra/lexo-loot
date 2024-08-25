import React from "react"

export type RecordSet=string[]

export interface AddProps{
    word: RecordSet,
    setWord: React.Dispatch<React.SetStateAction<RecordSet>>
}

export interface MyDataContextType{
    word: RecordSet;
    setWord: React.Dispatch<React.SetStateAction<RecordSet>>;
};

