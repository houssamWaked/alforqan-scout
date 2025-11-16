import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  PanResponder,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import achievementStyles from '../../src/Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import { useAchievements } from '../../src/hooks/useAchievements';
import { ACHIEVEMENTS_TEXT } from '../../constants/texts/achievementTexts';

export default function AchievementDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const styles = useThemedStyles(achievementStyles);
  const { colors } = useTheme();
  const { achievements } = useAchievements();

  const achievement = useMemo(
    () => achievements.find((a) => String(a.id) === String(id)),
    [achievements, id]
  );

  const images =
    achievement?.images || (achievement?.image ? [achievement.image] : []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const [loadingMap, setLoadingMap] = useState({});
  const [errorMap, setErrorMap] = useState({});

  const handleLayout = useCallback(
    (event) => {
      const width = event.nativeEvent.layout.width;
      if (!width) return;
      setCardWidth(width);
      translateX.setValue(-currentIndex * width);
    },
    [currentIndex, translateX]
  );

  const goToIndex = useCallback(
    (index) => {
      if (!cardWidth || !images.length) return;
      const clamped = Math.max(0, Math.min(images.length - 1, index));
      if (clamped === currentIndex) return;
      setCurrentIndex(clamped);
      Animated.timing(translateX, {
        toValue: -clamped * cardWidth,
        duration: 220,
        useNativeDriver: true,
      }).start();
    },
    [cardWidth, images.length, currentIndex, translateX]
  );

  const goNext = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [currentIndex, goToIndex]);

  const goPrev = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [currentIndex, goToIndex]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 10,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -40) {
          goNext();
        } else if (gesture.dx > 40) {
          goPrev();
        }
      },
    })
  ).current;

  const handleLoadStart = (index) => {
    setLoadingMap((prev) => ({ ...prev, [index]: true }));
    setErrorMap((prev) => ({ ...prev, [index]: false }));
  };

  const handleLoadEnd = (index) => {
    setLoadingMap((prev) => ({ ...prev, [index]: false }));
  };

  const handleError = (index) => {
    setLoadingMap((prev) => ({ ...prev, [index]: false }));
    setErrorMap((prev) => ({ ...prev, [index]: true }));
  };

  const title =
    ACHIEVEMENTS_TEXT.detailTitle || ACHIEVEMENTS_TEXT.pageTitle;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.detailHeaderRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.detailBackButton}
            accessibilityRole="button"
            accessibilityLabel="رجوع"
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
          <Text style={styles.detailScreenTitle}>{title}</Text>
        </View>

        {achievement ? (
          <>
            {images.length > 0 && (
              <View
                style={styles.detailHeroCard}
                onLayout={handleLayout}
                {...panResponder.panHandlers}
              >
                <Animated.View
                  style={[
                    styles.detailCarouselTrack,
                    cardWidth && images.length
                      ? { width: cardWidth * images.length }
                      : null,
                    { transform: [{ translateX }] },
                  ]}
                >
                  {images.map((uri, index) => (
                    <View
                      key={index}
                      style={[
                        styles.detailImageWrapper,
                        cardWidth ? { width: cardWidth } : { flex: 1 },
                      ]}
                    >
                      {!errorMap[index] ? (
                        <>
                          <Image
                            source={{ uri }}
                            style={styles.detailImage}
                            onLoadStart={() => handleLoadStart(index)}
                            onLoadEnd={() => handleLoadEnd(index)}
                            onError={() => handleError(index)}
                          />
                          {loadingMap[index] && (
                            <View style={styles.detailImageOverlay}>
                              <ActivityIndicator color={colors.primary} />
                            </View>
                          )}
                        </>
                      ) : (
                        <View style={styles.detailImageFallback}>
                          <Ionicons
                            name="image-outline"
                            size={28}
                            color={colors.subText}
                          />
                          <Text style={styles.detailImageFallbackText}>
                            الصورة غير متاحة
                          </Text>
                        </View>
                      )}
                    </View>
                  ))}
                </Animated.View>

                {images.length > 1 && (
                  <>
                    <View style={[styles.detailArrow, styles.detailArrowLeft]}>
                      <TouchableOpacity
                        onPress={goPrev}
                        disabled={currentIndex === 0}
                        accessibilityRole="button"
                        accessibilityLabel="الصورة السابقة"
                      >
                        <Ionicons
                          name="chevron-back"
                          size={22}
                          color={
                            currentIndex === 0
                              ? colors.subText
                              : colors.text
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={[styles.detailArrow, styles.detailArrowRight]}
                    >
                      <TouchableOpacity
                        onPress={goNext}
                        disabled={currentIndex === images.length - 1}
                        accessibilityRole="button"
                        accessibilityLabel="الصورة التالية"
                      >
                        <Ionicons
                          name="chevron-forward"
                          size={22}
                          color={
                            currentIndex === images.length - 1
                              ? colors.subText
                              : colors.text
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            )}

            <Text style={styles.detailTitle}>{achievement.title}</Text>
            <Text style={styles.detailDescription}>
              {achievement.description}
            </Text>
          </>
        ) : (
          <View style={styles.emptyStateWrapper}>
            <Text style={styles.desc}>
              {ACHIEVEMENTS_TEXT.notFoundMessage}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

