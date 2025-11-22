import React, { memo } from 'react';
import { View, Text } from 'react-native';

import aboutStyles from '../../Styles/AboutUsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { ABOUT_TEXT } from '../../../constants/texts/aboutTexts';

function AboutEmptyState() {
  const styles = useThemedStyles(aboutStyles);

  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>{ABOUT_TEXT.emptyMessage}</Text>
    </View>
  );
}

AboutEmptyState.displayName = 'AboutEmptyState';

export default memo(AboutEmptyState);
