import React, { memo } from 'react';
import { View, ActivityIndicator } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';

function EventLoading() {
  const styles = useThemedStyles(eventsStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}

EventLoading.displayName = 'EventLoading';

export default memo(EventLoading);
