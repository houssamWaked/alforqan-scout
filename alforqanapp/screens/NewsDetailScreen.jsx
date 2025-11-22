import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
  Animated,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../src/hooks/useTheme';
import { useFadeAndScale } from '../src/hooks/useFadeAndScale';
import supabase from '../src/services/supabaseClient';

const { width } = Dimensions.get('window');

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();
  const { fadeAnim, scaleAnim } = useFadeAndScale();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    let isMounted = true;

    async function fetchNews() {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('id, title, content, mainImage, gallery, created_at, category')
        .eq('id', id)
        .single();

      if (!isMounted) return;
      if (error) {
        setNewsItem(null);
      } else {
        setNewsItem(data);
      }
      setLoading(false);
    }

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const onShare = useCallback(async () => {
    if (!newsItem) return;
    try {
      await Share.share({
        message: `${newsItem.title}\n${newsItem.content}`,
      });
    } catch (error) {
      console.warn('Share error', error);
    }
  }, [newsItem]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <Animated.View style={[styles.skeletonCard, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]} />
        <View style={styles.skeletonLines}>
          <View style={styles.skeletonLine} />
          <View style={[styles.skeletonLine, styles.skeletonShort]} />
          <View style={[styles.skeletonLine, styles.skeletonShort]} />
        </View>
      </SafeAreaView>
    );
  }

  if (!newsItem) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <Text style={styles.errorText}>لا يمكن العثور على الخبر المطلوب.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image source={{ uri: newsItem.mainImage }} style={styles.heroImage} />
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.metaRow}>
            <Text style={styles.category}>{newsItem.category}</Text>
            <Text style={styles.date}>{new Date(newsItem.created_at).toLocaleDateString('ar-EG')}</Text>
          </View>

          <Text style={styles.title}>{newsItem.title}</Text>

          <Text style={styles.body}>{newsItem.content}</Text>

          <View style={styles.gallerySection}>
            <Text style={styles.sectionLabel}>معرض الصور</Text>
            {newsItem.gallery?.length ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.galleryRow}
              >
                {newsItem.gallery.map((uri, index) => (
                  <Image key={index} source={{ uri }} style={styles.galleryImage} />
                ))}
              </ScrollView>
            ) : (
              <View style={styles.emptyGallery}>
                <Ionicons name="images-outline" size={18} color={colors.subText} />
                <Text style={styles.emptyText}>لا توجد صور إضافية</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Ionicons name="share-social" size={18} color={colors.background} />
            <Text style={styles.shareLabel}>مشاركة</Text>
          </TouchableOpacity>
        </Animated.View>
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
    centered: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    skeletonCard: {
      width: width,
      height: width * 0.6,
      backgroundColor: colors.card,
    },
    skeletonLines: {
      width: '92%',
      gap: 12,
      marginTop: 20,
    },
    skeletonLine: {
      height: 14,
      borderRadius: 10,
      backgroundColor: colors.card,
    },
    skeletonShort: {
      width: '70%',
    },
    heroImage: {
      width: '100%',
      height: width * 0.7,
    },
    backButton: {
      position: 'absolute',
      top: 18,
      left: 18,
      backgroundColor: colors.primary,
      borderRadius: 18,
      padding: 8,
      opacity: 0.9,
    },
    content: {
      padding: 20,
      gap: 16,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    category: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: '700',
    },
    date: {
      fontSize: 12,
      color: colors.subText,
    },
    title: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.text,
      lineHeight: 32,
    },
    body: {
      fontSize: 15,
      lineHeight: 26,
      color: colors.text,
    },
    gallerySection: {
      gap: 10,
    },
    sectionLabel: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
    galleryRow: {
      gap: 12,
      paddingVertical: 6,
    },
    galleryImage: {
      width: width * 0.6,
      height: width * 0.4,
      borderRadius: 12,
    },
    emptyGallery: {
      height: 120,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    emptyText: {
      color: colors.subText,
      fontSize: 13,
    },
    shareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: colors.primary,
      padding: 14,
      borderRadius: 14,
      justifyContent: 'center',
    },
    shareLabel: {
      color: colors.background,
      fontWeight: '700',
      fontSize: 15,
    },
    errorText: {
      color: colors.text,
      textAlign: 'center',
      fontSize: 16,
    },
  });

