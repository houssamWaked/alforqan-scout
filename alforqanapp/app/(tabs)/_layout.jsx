// app/(tabs)/_layout.jsx
import React, { useMemo } from 'react';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../src/hooks/useTheme';
import TAB_TEXTS from '../../constants/texts/tabTexts';
import { Dimensions, Platform, View } from 'react-native';

function TabsContent({ insets }) {
  const { colors } = useTheme();
  const { width } = Dimensions.get('window');

  // Responsive icon size
  const ICON = useMemo(() => {
    if (width > 768) return 30; // Tablet
    if (width < 360) return 22; // Small phone
    return 26; // Default
  }, [width]);

  // Memoized styles to avoid re-renders
  const styles = useMemo(() => createStyles(colors, insets), [colors, insets]);

  // Icon wrapper (focused underline)
  const renderIcon = (name, focused, color) => (
    <View style={styles.iconWrapper(focused)}>
      <Ionicons name={name} size={ICON} color={color} />
      {focused && <View style={styles.focusBar} />}
    </View>
  );

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.subText,
          tabBarStyle: styles.tabBar,
        }}
      >
        {/* Home */}
        <Tabs.Screen
          name="Home"
          options={{
            title: TAB_TEXTS.home,
            tabBarIcon: ({ focused, color }) =>
              renderIcon(focused ? 'home' : 'home-outline', focused, color),
          }}
        />

        {/* Events */}
        <Tabs.Screen
          name="events"
          options={{
            title: 'الأنشطة',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name="calendar-outline" size={ICON} color={color} />
            ),
          }}
        />

        {/* About Us */}
        <Tabs.Screen
          name="AboutUs"
          options={{
            title: TAB_TEXTS.about,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={
                  focused ? 'information-circle' : 'information-circle-outline'
                }
                size={ICON}
                color={color}
              />
            ),
          }}
        />

        {/* Achievements */}
        <Tabs.Screen
          name="Achievements"
          options={{
            title: TAB_TEXTS.achievements,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? 'checkbox' : 'checkbox-outline'}
                size={ICON}
                color={color}
              />
            ),
          }}
        />

        {/* Gallery */}
        <Tabs.Screen
          name="PhotoGallery"
          options={{
            title: TAB_TEXTS.photoGallery,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? 'images' : 'images-outline'}
                size={ICON}
                color={color}
              />
            ),
          }}
        />
      </Tabs>

      {/* Bottom spacer for safe area */}
      <View style={styles.bottomSpacer} />
    </>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return <TabsContent insets={insets} />;
}

const createStyles = (colors, insets) => ({
  tabBar: {
    backgroundColor: colors.card,
    borderTopWidth: Platform.OS === 'web' ? 0.5 : 1,
    borderTopColor: colors.border,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    paddingBottom: 8,
    paddingTop: 6,
    borderRadius: 0,
    elevation: 0,
    shadowOpacity: 0,
  },

  iconWrapper: (focused) => ({
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    paddingVertical: focused ? 4 : 2,
  }),

  focusBar: {
    marginTop: 3,
    width: 18,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },

  bottomSpacer: {
    height: insets.bottom,
    backgroundColor: colors.card,
    width: '100%',
  },
});
