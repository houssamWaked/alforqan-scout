import React, { memo } from 'react';
import { View, ActivityIndicator } from 'react-native';

import newsStyles from '../../Styles/NewsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';

function NewsLoading() {
  const styles = useThemedStyles(newsStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}

NewsLoading.displayName = 'NewsLoading';

export default memo(NewsLoading);
