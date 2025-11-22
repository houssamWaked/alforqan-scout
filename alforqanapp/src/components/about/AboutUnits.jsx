import React, { memo } from 'react';
import { View, Text } from 'react-native';

import aboutStyles from '../../Styles/AboutUsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import AboutUnitCard from './AboutUnitCard';

function AboutUnits({ label, units, unitButtonLabel }) {
  const styles = useThemedStyles(aboutStyles);
  if (!Array.isArray(units) || units.length === 0) return null;

  return (
    <View>
      <Text style={styles.unitsLabel}>{label}</Text>
      <View style={styles.unitGrid}>
        {units.map((unit, index) => (
          <AboutUnitCard
            key={`${unit.title}-${index}`}
            unit={unit}
            index={index}
            unitButtonLabel={unitButtonLabel}
          />
        ))}
      </View>
    </View>
  );
}

AboutUnits.displayName = 'AboutUnits';

export default memo(AboutUnits);
