import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();

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
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer>
      <Drawer.Screen
        name="settings" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'settings',
          title: 'overview',
        }}
      />
{      <Drawer.Screen
        name="account" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'account',
          title: 'overview',
        }}
      />}
{      <Drawer.Screen
        name="dictionary" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'dictionary',
          title: 'overview',
        }}
      />}
    </Drawer>
  </GestureHandlerRootView>
  );
}
