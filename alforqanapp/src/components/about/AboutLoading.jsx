import React, { memo } from 'react';
import { View, ActivityIndicator } from 'react-native';

import aboutStyles from '../../Styles/AboutUsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';

function AboutLoading() {
  const styles = useThemedStyles(aboutStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}

AboutLoading.displayName = 'AboutLoading';

export default memo(AboutLoading);
