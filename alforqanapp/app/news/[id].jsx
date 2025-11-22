import React, { useMemo } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/hooks/useTheme';
import { getNewsById } from '../../src/services/newsService';

export default function NewsDetailScreen() {
  const params = useLocalSearchParams();
  const { colors } = useTheme();
  const router = useRouter();
  const newsItem = useMemo(() => getNewsById(params.id), [params.id]);
  const styles = createStyles(colors);

  if (!newsItem) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>لا يمكن العثور على الخبر المطلوب.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: newsItem.title,
          headerShown: true,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{newsItem.title}</Text>
        <Text style={styles.date}>{newsItem.date}</Text>

        <Text style={styles.content}>{newsItem.content}</Text>

        <View style={styles.galleryWrapper}>
          {newsItem.images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.image} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      padding: 16,
      gap: 12,
      paddingBottom: 40,
    },
    title: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.primary,
      lineHeight: 30,
    },
    date: {
      fontSize: 12,
      color: colors.subText,
    },
    content: {
      fontSize: 16,
      lineHeight: 26,
      color: colors.text,
    },
    galleryWrapper: {
      marginTop: 8,
      gap: 12,
    },
    image: {
      width: '100%',
      height: 210,
      borderRadius: 12,
    },
    errorText: {
      color: colors.text,
      textAlign: 'center',
      marginTop: 40,
    },
  });
