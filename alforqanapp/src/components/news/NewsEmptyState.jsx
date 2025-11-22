import React, { memo } from 'react';
import { View, Text } from 'react-native';

import newsStyles from '../../Styles/NewsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { NEWS_TEXT } from '../../../constants/texts/newsTexts';

function NewsEmptyState() {
  const styles = useThemedStyles(newsStyles);

  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>{NEWS_TEXT.emptyText}</Text>
    </View>
  );
}

NewsEmptyState.displayName = 'NewsEmptyState';

export default memo(NewsEmptyState);
