import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//import { Drawer } from 'expo-router/drawer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Account from './account';
import Settings from './settings';
import Dictionary from './dictionary';

const Drawer = createDrawerNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  const [loaded] = useFonts({
    SpaceMono: require('./../assets/fonts/SpaceMono-Regular.ttf'),
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
 <SafeAreaProvider>
       <Drawer.Navigator>
       <Drawer.Screen
           name="account" // This is the name of the page and must match the url from root
           component={Account}
         />
       <Drawer.Screen
           name="settings" // This is the name of the page and must match the url from root
           component={Settings}
         />
       <Drawer.Screen
           name="dictionary" // This is the name of the page and must match the url from root
           component={Dictionary}
         />
       </Drawer.Navigator>
 </SafeAreaProvider>
  );
}
