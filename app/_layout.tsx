import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
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
import { clearAndPopulateDatabase, initializeDatabase, showId } from '@/constants/DataBase';
import { Text } from 'react-native';

const Stack = createStackNavigator<RootStackProps>();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const sampleWords = ['DEF','GHI','MNO','PQR','STU']
    
    const dbSetup = async () => {
      try {
        setIsLoading(true)
        console.log("Initializing database...")
        await initializeDatabase()
        console.log("Database initialized")
        console.log("Clearing and populating database...")
        await clearAndPopulateDatabase(sampleWords)
        console.log("Database populated")
        setIsLoading(false)
      } catch (error) {
        console.error('Error setting up database:', error)
        setIsLoading(false)
      }
    }

    if (loaded) {
      SplashScreen.hideAsync();
      dbSetup();
    }

  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Cntxt>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {isLoading ? <Text>Loading...</Text>:            
          <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="index" component={index} options={{headerStyle:{height:50}}}/>
              <Stack.Screen name="add" component={add} options={{headerStyle:{height:50}}}/>
              <Stack.Screen name="RecordView" component={RecordView} options={{headerStyle:{height:50}}}/>
            </Stack.Navigator>}
            <FilterModal></FilterModal>
        </ThemeProvider>
      </Cntxt>
  );
}
