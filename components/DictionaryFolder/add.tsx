import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { editWordById, insertWord } from '@/constants/DataBase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AddProps } from '@/constants/DataTypes'

//checkbox catergories data

const categoryData: string[] = ['Noun', 'Verb', 'Adjective', 'Adverb'];

const Add:React.FC<AddProps> = ({route}) => {
  const navigate=useNavigation()

  const {elem} = route.params

  const stringToArray = (input: string): string[] => {
    return input.split('|');
  };

  //Form data states -------------------------------------->>>>>>>>>>>>>>>
  const [newWord, setNewWord] = React.useState<string>(elem.word)
  const [meaning, setMeaning] = React.useState<string>(elem.meaning)
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(stringToArray(elem.category))

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) { 
      // Remove category if already selected
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      // Add category if not selected
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const isCategorySelected = (category: string) => selectedCategories.includes(category);


  //Database functions ------------------------------------>>>>>>>>>>>>>>>
  const arrayToString = (arr: string[]): string => {
    return arr.join('|');
  };

  const handleWord = () => {

    let obj = {
      word: newWord,
      meaning: meaning,
      category: arrayToString(selectedCategories)
    }

    if(elem.id==0){//Adding new record ------------------------>>>>>>>>>>
      insertWord(obj, (success) => {
        if (success) {
          console.log('Word added successfully');
          navigate.navigate('index' as never)
        } else {
          console.log('Failed to add word');
        }
      });
    }else{//Edit existing record -------------------------->>>>>>>>>>>>>>
      editWordById(elem.id,obj,(success)=>{
        if (success) {
          console.log('Word edited successfully');
          navigate.navigate('index' as never)
        } else {
          console.log('Failed to edit word');
        }
      })
    }


  };
  

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Add new word</Text>
        <TextInput onChangeText={(e)=>setNewWord(e)} style={styles.input} value={newWord}></TextInput>
        <Text>Meaning</Text>
        <TextInput onChangeText={(e)=>setMeaning(e)} style={styles.input} value={meaning}></TextInput>


        {/*-------- Catergory checkbox ------------------*/}
        <Text>Category</Text>
        <FlatList
        data={categoryData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleCategoryChange(item)}
          >
            <View style={styles.checkbox}>
              {isCategorySelected(item) && <View style={styles.checkedBox} />}
            </View>
            <Text style={styles.label}>{item}</Text>
          </TouchableOpacity>
        )}
      />

        <Button title={elem.id!=0?'Save':'Add'} onPress={()=>handleWord()}></Button>
      </View>
    </SafeAreaView>
  )
}

export default Add

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: Colors.light.background
    },
    input:{
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius:5,
      marginBottom:10,
      marginTop:10
    },
    header: {
      fontSize: 20,
      marginBottom: 10,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: '#444',
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkedBox: {
      width: 12,
      height: 12,
      backgroundColor: '#444',
    },
    label: {
      fontSize: 16,
    },
    selectedText: {
      marginTop: 20,
      fontSize: 16,
    },
})