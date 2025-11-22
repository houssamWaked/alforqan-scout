import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';
import { ACHIEVEMENTS_TEXT } from '../../../constants/texts/achievementTexts';
import AchievementHeroControls from './AchievementHeroControls';

function AchievementHero({ title, badge, year, images, fallbackImage }) {
  const styles = useThemedStyles(achievementsStyles);
  const { colors } = useTheme();

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
    setIndex((prev) => (prev < totalImages - 1 ? prev + 1 : prev));
  }, [totalImages]);

  const counterLabel = useMemo(() => {
    if (!totalImages) return '0 / 0';
    return `${index + 1} / ${totalImages}`;
  }, [index, totalImages]);

  if (!source) {
    return (
      <View style={styles.heroCard}>
        <View style={styles.heroFallback}>
          <Text style={styles.heroTitle}>
            {title || ACHIEVEMENTS_TEXT.detailTitle}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.heroCard}>
      <Image
        source={source}
        style={styles.heroImage}
        accessibilityLabel={title || ACHIEVEMENTS_TEXT.imageAlt}
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.65)']}
        style={styles.heroOverlay}
      >
        <Text style={styles.heroDetailTitle} numberOfLines={2}>
          {title || ACHIEVEMENTS_TEXT.detailTitle}
        </Text>
        <View style={styles.heroMetaRow}>
          {badge ? <Text style={styles.heroMetaText}>{badge}</Text> : null}
          {year ? <Text style={styles.heroMetaText}>{year}</Text> : null}
        </View>
      </LinearGradient>

      {totalImages > 1 ? (
        <AchievementHeroControls
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          onPrev={handlePrev}
          onNext={handleNext}
          counterLabel={counterLabel}
          color={colors.text}
        />
      ) : null}
    </View>
  );
}

AchievementHero.displayName = 'AchievementHero';

export default memo(AchievementHero);
