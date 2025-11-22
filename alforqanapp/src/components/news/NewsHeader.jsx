import React, { memo, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import newsStyles from '../../Styles/NewsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';
import { NEWS_TEXT } from '../../../constants/texts/newsTexts';

function NewsHeader({ title, onBack }) {
  const styles = useThemedStyles(newsStyles);
  const { colors } = useTheme();

  const headerTitle = useMemo(
    () => title || NEWS_TEXT.detailTitleFallback,
    [title]
  );

  return (
    <View style={styles.headerRow}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel={NEWS_TEXT.backLabel}
        activeOpacity={0.8}
      >
        <Ionicons name="chevron-back" size={20} color={colors.text} />
      </TouchableOpacity>

      <Text style={styles.headerTitle} numberOfLines={2}>
        {headerTitle}
      </Text>

      <View style={styles.headerSpacer} />
    </View>
  );
}

NewsHeader.displayName = 'NewsHeader';

export default memo(NewsHeader);
