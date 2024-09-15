import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import index from './index';
import add from './add';
import React from 'react';
import { Cntxt} from '@/constants/Cntxt';
import RecordView from './RecordView';
import { RootStackProps } from '@/constants/DataTypes';
import FilterModal from './VocabView/FilterModal';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { insertRecord } from '@/constants/DataBase';
//import openDatabase from '@/constants/DataBase';

const Stack = createStackNavigator<RootStackProps>();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    //First Method------------------------------------>>>>>>>>>>>>>


    //Second Method------------------------------------>>>>>>>>>>>>>

/*     const fetchData =async()=>{
      const db = await openDatabase();

      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT);'
        );
      });

    }

    fetchData(); */

  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Cntxt>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator>
              <Stack.Screen name="index" component={index} options={{headerStyle:{height:50}}}/>
              <Stack.Screen name="add" component={add} options={{headerStyle:{height:50}}}/>
              <Stack.Screen name="RecordView" component={RecordView} 
                options={{
                    headerStyle:{height:50},
                    headerRight: () => (
                      <AntDesign name="edit" size={24} color="black" style={{ marginRight: 25 }} />
                    )
                  }}
              />
            </Stack.Navigator>
            <FilterModal></FilterModal>
        </ThemeProvider>
      </Cntxt>
  );
}
