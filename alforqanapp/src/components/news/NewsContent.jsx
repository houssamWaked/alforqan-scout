import React, { memo } from 'react';
import { View, Text } from 'react-native';

import newsStyles from '../../Styles/NewsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { NEWS_TEXT } from '../../../constants/texts/newsTexts';

function NewsContent({ title, body }) {
  const styles = useThemedStyles(newsStyles);
  const contentBody = body || '';

  return (
    <View>
      <Text style={styles.sectionTitle}>{title || NEWS_TEXT.detailTitleFallback}</Text>
      <Text style={styles.bodyText}>{contentBody}</Text>
    </View>
  );
}

NewsContent.displayName = 'NewsContent';

export default memo(NewsContent);
