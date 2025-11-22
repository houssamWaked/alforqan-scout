import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import newsStyles from '../../Styles/NewsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { NEWS_TEXT } from '../../../constants/texts/newsTexts';
import NewsImageControls from './NewsImageControls';

function NewsHero({ title, date, images, fallbackImage }) {
  const styles = useThemedStyles(newsStyles);
  const heroTitle = title || NEWS_TEXT.detailTitleFallback;
  const heroDate = date || '';

  const normalizedImages = useMemo(() => {
    const list = Array.isArray(images) ? images.filter(Boolean) : [];
    if (list.length) return list;
    return fallbackImage ? [fallbackImage] : [];
  }, [images, fallbackImage]);

  const totalImages = normalizedImages.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [totalImages]);

  const source = useMemo(() => {
    if (!totalImages) return null;
    const candidate = normalizedImages[index] || normalizedImages[0];
    if (typeof candidate === 'string') return { uri: candidate };
    return candidate;
  }, [index, normalizedImages, totalImages]);

  const canGoPrev = totalImages > 1 && index > 0;
  const canGoNext = totalImages > 1 && index < totalImages - 1;

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setIndex((prev) =>
      prev < totalImages - 1 ? prev + 1 : prev
    );
  }, [totalImages]);

  const counterLabel = useMemo(() => {
    if (!totalImages) return '0 / 0';
    return `${index + 1} / ${totalImages}`;
  }, [index, totalImages]);

  if (!source) return null;

  return (
    <View style={styles.heroCard}>
      <Image
        source={source}
        style={styles.heroImage}
        accessibilityLabel={NEWS_TEXT.imageAlt}
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.65)']}
        style={styles.heroOverlay}
      >
        <Text style={styles.heroTitle} numberOfLines={2}>
          {heroTitle}
        </Text>
        <View style={styles.heroMetaRow}>
          <Text style={styles.heroMetaText}>{heroDate}</Text>
        </View>
      </LinearGradient>

      {totalImages > 1 ? (
        <NewsImageControls
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          onPrev={handlePrev}
          onNext={handleNext}
          counterLabel={counterLabel}
        />
      ) : null}
    </View>
  );
}

NewsHero.displayName = 'NewsHero';

export default memo(NewsHero);
