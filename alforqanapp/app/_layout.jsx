import React, { useEffect, useState, useCallback } from 'react';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState(null);

  const checkFirstLaunch = useCallback(async () => {
    try {
      const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');

      if (hasSeenWelcome) {
        setInitialRoute('(tabs)');
      } else {
        setInitialRoute('index');
        AsyncStorage.setItem('hasSeenWelcome', 'true'); // no need to await
      }
    } catch (e) {
      console.error('AsyncStorage error:', e);
      setInitialRoute('(tabs)');
    }
  }, []);

  useEffect(() => {
    checkFirstLaunch();
  }, [checkFirstLaunch]);

  if (!initialRoute) return null; // or <SplashScreen/>

  return (
    <ThemeProvider>
      <Stack
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Settings" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
