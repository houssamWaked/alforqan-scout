import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { HOME_TEXT } from '../../../constants/texts/homeTexts';
import homeStyles from '../../Styles/HomeStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

function PinnedAnnouncement({ announcement }) {
  const styles = useThemedStyles(homeStyles);
  return (
    <View style={styles.pinnedBox}>
      <Text style={styles.pinnedTitle}>{HOME_TEXT.pinnedTitle}</Text>
      <Text style={styles.pinnedText}>
        {announcement || HOME_TEXT.fallbackAnnounce}
      </Text>
    </View>
  );
}

export default memo(PinnedAnnouncement);
