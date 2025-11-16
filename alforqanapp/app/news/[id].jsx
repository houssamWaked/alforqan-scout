import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import eventsStyles from '../../src/Styles/EventsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import { getNewsById } from '../../src/Data/news';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const styles = useThemedStyles(eventsStyles);
  const { colors } = useTheme();

  const newsItem = useMemo(() => getNewsById(id), [id]);

  const galleryImages = useMemo(() => {
    if (!newsItem) return [];
    if (Array.isArray(newsItem.images) && newsItem.images.length > 0) {
      return newsItem.images;
    }
    if (newsItem.image) {
      return [newsItem.image];
    }
    return [];
  }, [newsItem]);

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [id, galleryImages.length]);

  const totalImages = galleryImages.length;

  const handlePrev = useCallback(() => {
    setImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setImageIndex((prev) =>
      prev < totalImages - 1 ? prev + 1 : prev
    );
  }, [totalImages]);

  const currentImageSource =
    totalImages > 0 && galleryImages[imageIndex]
      ? galleryImages[imageIndex]
      : newsItem?.image;

  const canGoPrev = totalImages > 1 && imageIndex > 0;
  const canGoNext = totalImages > 1 && imageIndex < totalImages - 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.detailHeaderRow}>
          <View style={{ flex: 1 }} />
          <Text style={styles.detailScreenTitle}>
            {newsItem?.title || 'خبر الكشافة'}
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.detailBackButton}
            accessibilityRole="button"
            accessibilityLabel="رجوع"
          >
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        {newsItem ? (
          <>
            <View style={styles.heroCard}>
              {currentImageSource && (
                <Image source={currentImageSource} style={styles.heroImage} />
              )}

              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.heroOverlay}
              >
                <View style={styles.heroTitleRow}>
                  <Text style={styles.detailTitle} numberOfLines={2}>
                    {newsItem.title}
                  </Text>
                </View>

                <View style={styles.heroMetaRow}>
                  <Text style={styles.heroMetaText}>{newsItem.date}</Text>
                </View>
              </LinearGradient>
            </View>

            {totalImages > 1 && (
              <View style={styles.newsHeroControls}>
                <TouchableOpacity
                  onPress={handlePrev}
                  disabled={!canGoPrev}
                  style={[
                    styles.newsHeroArrow,
                    !canGoPrev && styles.newsHeroArrowDisabled,
                  ]}
                >
                  <Ionicons
                    name="chevron-back"
                    size={18}
                    color={colors.text}
                  />
                </TouchableOpacity>

                <Text style={styles.newsHeroCounter}>
                  {imageIndex + 1} / {totalImages}
                </Text>

                <TouchableOpacity
                  onPress={handleNext}
                  disabled={!canGoNext}
                  style={[
                    styles.newsHeroArrow,
                    !canGoNext && styles.newsHeroArrowDisabled,
                  ]}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.text}
                  />
                </TouchableOpacity>
              </View>
            )}

            <Text style={styles.sectionTitle}>{newsItem.title}</Text>
            <Text style={styles.descriptionText}>{newsItem.content}</Text>
          </>
        ) : (
          <View style={styles.emptyStateWrapper}>
            <Text style={styles.emptyStateText}>
              لم نستطع العثور على هذا الخبر حالياً.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

