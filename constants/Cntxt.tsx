import React, { createContext, useState,ReactNode,useContext } from 'react';
import { MyDataContextType, RecordSet } from './DataTypes';

const MyDataContext = createContext<MyDataContextType | undefined>(undefined);

export const Cntxt: React.FC<{children : ReactNode}> = ({ children }) => {
  
  const [word, setWord] = useState<RecordSet>(['abc', 'def', 'ghi', 'jkl', 'mno', 'pqr', 'stu', 'vwx', 'yz']);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <MyDataContext.Provider value={{ word, setWord, modalVisible,setModalVisible}}>
      {children}
    </MyDataContext.Provider>
  );
};

export const useSharedState = (): MyDataContextType => {
  const context = useContext(MyDataContext);
  if (!context) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
}
