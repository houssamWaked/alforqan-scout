import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';
import { EVENTS_TEXT } from '../../../constants/texts/eventsTexts';

function EventHeader({ title, onBack }) {
  const styles = useThemedStyles(eventsStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.headerRow}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel={EVENTS_TEXT.backLabel}
        activeOpacity={0.8}
      >
        <Ionicons name="chevron-back" size={20} color={colors.text} />
      </TouchableOpacity>

      <Text style={styles.headerTitle} numberOfLines={2}>
        {title || EVENTS_TEXT.detailTitleFallback}
      </Text>

      <View style={styles.headerSpacer} />
    </View>
  );
}

EventHeader.displayName = 'EventHeader';

export default memo(EventHeader);
