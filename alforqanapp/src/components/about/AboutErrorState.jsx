import React, { memo } from 'react';
import { View, Text } from 'react-native';

import aboutStyles from '../../Styles/AboutUsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

function AboutErrorState({ message }) {
  const styles = useThemedStyles(aboutStyles);
  if (!message) return null;

  return (
    <View style={styles.loadingWrapper}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

AboutErrorState.displayName = 'AboutErrorState';

export default memo(AboutErrorState);
