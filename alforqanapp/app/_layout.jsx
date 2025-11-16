// app/_layout.jsx
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
        if (hasSeenWelcome) {
          setInitialRoute('(tabs)'); // user has already seen welcome
        } else {
          setInitialRoute('index'); // first time opening the app
          await AsyncStorage.setItem('hasSeenWelcome', 'true');
        }
      } catch (e) {
        console.error('Error reading AsyncStorage:', e);
        setInitialRoute('(tabs)');
      }
    };
    checkFirstLaunch();
  }, []);

  // While checking AsyncStorage, render nothing (avoid flash)
  if (!initialRoute) return null;

  return (
    <ThemeProvider>
      <Stack
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        {/* Welcome screen */}
        <Stack.Screen name="index" />

        {/* Main app (tabs) */}
        <Stack.Screen name="(tabs)" />

        {/* Optional settings screen */}
        <Stack.Screen
          name="Settings"
          options={{ title: 'Settings', headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}
