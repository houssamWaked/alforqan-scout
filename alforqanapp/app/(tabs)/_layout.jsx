import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../src/hooks/useTheme';
import { ThemeProvider } from '../../src/context/ThemeContext';
import TAB_TEXTS from '../../constants/texts/tabTexts';

function TabsContent({ insets }) {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subText,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 2,
          borderTopColor: colors.border,
          paddingTop: 1,
          paddingBottom: Math.max(insets.bottom, 4),
          height: 60 + insets.bottom,
          position: 'absolute',
          left: 10,
          right: 10,
          bottom: insets.bottom ? insets.bottom : 15,
          borderRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: TAB_TEXTS.home,
        tabBarIcon: ({ focused, color }) => (
          <Ionicons
            name={focused ? 'home' : 'home-outline'}
            size={24}
            color={color}
            />
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
            size={24}
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
            size={24}
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
            size={24}
            color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Settings"
        options={{
          title: TAB_TEXTS.settings,
        tabBarIcon: ({ focused, color }) => (
          <Ionicons
            name={focused ? 'settings' : 'settings-outline'}
            size={24}
            color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <ThemeProvider>
      <TabsContent insets={insets} />
    </ThemeProvider>
  );
}
