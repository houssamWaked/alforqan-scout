import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import newsStyles from '../../Styles/NewsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';
import { NEWS_TEXT } from '../../../constants/texts/newsTexts';

function NewsImageControls({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  counterLabel,
}) {
  const styles = useThemedStyles(newsStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.heroControls}>
      <TouchableOpacity
        style={[
          styles.heroControlButton,
          !canGoPrev && styles.heroControlDisabled,
        ]}
        onPress={onPrev}
        disabled={!canGoPrev}
        accessibilityRole="button"
        accessibilityLabel={NEWS_TEXT.heroPrevLabel}
        activeOpacity={0.85}
      >
        <Ionicons name="chevron-back" size={18} color={colors.text} />
      </TouchableOpacity>

      <Text
        style={styles.heroCounter}
        accessibilityLabel={NEWS_TEXT.imageCounterLabel}
      >
        {counterLabel}
      </Text>

      <TouchableOpacity
        style={[
          styles.heroControlButton,
          !canGoNext && styles.heroControlDisabled,
        ]}
        onPress={onNext}
        disabled={!canGoNext}
        accessibilityRole="button"
        accessibilityLabel={NEWS_TEXT.heroNextLabel}
        activeOpacity={0.85}
      >
        <Ionicons name="chevron-forward" size={18} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

NewsImageControls.displayName = 'NewsImageControls';

export default memo(NewsImageControls);
