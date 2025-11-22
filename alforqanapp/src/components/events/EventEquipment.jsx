import React, { memo } from 'react';
import { View, Text } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { EVENTS_TEXT } from '../../../constants/texts/eventsTexts';

function EventEquipment({ equipment }) {
  const styles = useThemedStyles(eventsStyles);
  if (!Array.isArray(equipment) || equipment.length === 0) return null;

  return (
    <View>
      <Text style={styles.sectionTitle}>{EVENTS_TEXT.equipmentTitle}</Text>
      <View style={styles.equipmentChipRow}>
        {equipment.map((item, index) => (
          <View key={`${item}-${index}`} style={styles.equipmentChip}>
            <Text style={styles.equipmentChipText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

EventEquipment.displayName = 'EventEquipment';

export default memo(EventEquipment);
