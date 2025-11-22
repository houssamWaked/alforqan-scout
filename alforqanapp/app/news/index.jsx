import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../src/hooks/useTheme';
import { useNews } from '../../src/hooks/useNews';

export default function NewsListScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const news = useNews();

  const styles = createStyles(colors);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/news/[id]', params: { id: item.id } })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text numberOfLines={2} style={styles.summary}>
          {item.summary}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    list: {
      paddingBottom: 24,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 14,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
    separator: {
      height: 16,
    },
    thumbnail: {
      width: 110,
      height: 110,
    },
    cardContent: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 6,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.primary,
    },
    date: {
      fontSize: 12,
      color: colors.subText,
    },
    summary: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
  });
