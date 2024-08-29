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
import { Cntxt } from '@/constants/Cntxt';
import RecordView from './RecordView';
import { RootStackProps } from '@/constants/DataTypes';

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
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Cntxt>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>
            <Stack.Screen name="index" component={index} />
            <Stack.Screen name="add" component={add} />
            <Stack.Screen name="RecordView" component={RecordView} />
          </Stack.Navigator>
        </ThemeProvider>
      </Cntxt>
  );
}
