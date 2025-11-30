// src/components/home/PinnedAnnouncement.jsx
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { HOME_TEXT } from '../../../constants/texts/homeTexts';
import homeStyles from '../../Styles/HomeStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

function PinnedAnnouncement({ announcement }) {
  const styles = useThemedStyles(homeStyles);

  const isString = typeof announcement === 'string';
  const title = isString
    ? HOME_TEXT.pinnedTitle
    : announcement?.title || HOME_TEXT.pinnedTitle;
  const content = isString
    ? announcement
    : announcement?.content || HOME_TEXT.fallbackAnnounce;

  return (
    <View style={styles.pinnedBox}>
      <Text style={styles.pinnedTitle}>{title}</Text>
      <Text style={styles.pinnedText}>
        {content || HOME_TEXT.fallbackAnnounce}
      </Text>
    </View>
  );
}

PinnedAnnouncement.displayName = 'PinnedAnnouncement';

export default memo(PinnedAnnouncement);
