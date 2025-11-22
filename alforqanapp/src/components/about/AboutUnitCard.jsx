import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import aboutStyles from '../../Styles/AboutUsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

function AboutUnitCard({ unit, index, unitButtonLabel }) {
  const styles = useThemedStyles(aboutStyles);
  const router = useRouter();

  const divisionId =
    unit?.divisionId ||
    (index === 0 ? 'ashbal' : index === 1 ? 'scouts' : 'rovers');

  const handlePress = useCallback(() => {
    if (!divisionId) return;
    router.push({
      pathname: '/divisions/[id]',
      params: { id: divisionId },
    });
  }, [divisionId, router]);

  return (
    <TouchableOpacity
      style={styles.unitCard}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={unit?.title}
      onPress={handlePress}
    >
      <Text style={styles.unitIcon}>{unit?.icon}</Text>
      <Text style={styles.unitTitle}>{unit?.title}</Text>
      <Text style={styles.unitAge}>{unit?.age}</Text>
      <Text style={styles.unitDesc}>{unit?.description}</Text>
      <View style={styles.unitButton}>
        <Text style={styles.unitButtonLabel}>{unitButtonLabel}</Text>
      </View>
    </TouchableOpacity>
  );
}

AboutUnitCard.displayName = 'AboutUnitCard';

export default memo(AboutUnitCard);
