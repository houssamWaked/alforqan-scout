import React, { memo } from 'react';
import { View } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import PrimaryButton from '../PrimaryButton';

function EventCTA({ label, onPress }) {
  const styles = useThemedStyles(eventsStyles);

  return (
    <View style={styles.ctaWrapper}>
      <PrimaryButton label={label} onPress={onPress} />
    </View>
  );
}

EventCTA.displayName = 'EventCTA';

export default memo(EventCTA);
