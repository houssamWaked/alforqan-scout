import React, { memo } from 'react';
import { View, Text } from 'react-native';

import newsStyles from '../../Styles/NewsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

function NewsErrorState({ message }) {
  const styles = useThemedStyles(newsStyles);

  if (!message) return null;

  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

NewsErrorState.displayName = 'NewsErrorState';

export default memo(NewsErrorState);
