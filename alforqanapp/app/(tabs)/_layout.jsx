import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../src/hooks/useTheme';
import { ThemeProvider } from '../../src/context/ThemeContext';
import TAB_TEXTS from '../../constants/texts/tabTexts';
import { Dimensions, Platform, View } from 'react-native';

function TabsContent({ insets }) {
  const { colors } = useTheme();
  const { width } = Dimensions.get('window');

  // Responsive icon sizes based on Instagram
  const isSmallPhone = width < 360;
  const isTablet = width > 768;
  const ICON = isTablet ? 30 : isSmallPhone ? 22 : 26;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subText,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,

        // --- INSTAGRAM TAB BAR STYLE ---
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: Platform.OS === 'web' ? 0.5 : 1,
          borderTopColor: colors.border,

          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0, // Instagram = pinned to the VERY bottom

          height: isTablet ? 64 : 56,
          paddingBottom: isSmallPhone ? 4 : 8,
          paddingTop: 6,

          borderRadius: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: TAB_TEXTS.home,
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 8,
                paddingVertical: focused ? 4 : 2,
              }}
            >
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={ICON}
                color={color}
              />
              {focused && (
                <View
                  style={{
                    marginTop: 3,
                    width: 18,
                    height: 3,
                    borderRadius: 999,
                    backgroundColor: colors.primary,
                  }}
                />
              )}
            </View>
          ),
        }}
      />

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

      <Tabs.Screen
        name="ContactUs"
        options={{
          title: TAB_TEXTS.contactUs,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={ICON}
              color={color}
            />
          ),
        }}
      />

      {/* Keep Settings route but hide from tab bar */}
      <Tabs.Screen
        name="Settings"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <ThemeProvider>
      {/* MAIN TAB BAR */}
      <TabsContent insets={insets} />

      {/* 🔥 FILLER UNDER TAB BAR — solves gesture-bar gap */}
      <View
        style={{
          height: insets.bottom,
          backgroundColor: colors.card,
          width: '100%',
        }}
      />
    </ThemeProvider>
  );
}
