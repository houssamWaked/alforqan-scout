import React, { memo } from 'react';
import { View, Text } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { EVENTS_TEXT } from '../../../constants/texts/eventsTexts';

function EventProgram({ program }) {
  const styles = useThemedStyles(eventsStyles);
  if (!Array.isArray(program) || program.length === 0) return null;

  return (
    <View>
      <Text style={styles.sectionTitle}>{EVENTS_TEXT.programTitle}</Text>
      <View style={styles.programList}>
        {program.map((item, index) => (
          <View key={`${item?.time ?? index}-${index}`} style={styles.programItem}>
            <View style={styles.programTimeColumn}>
              <Text style={styles.programTime}>{item?.time}</Text>
            </View>
            <View style={styles.programContent}>
              <Text style={styles.programTitle}>{item?.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

EventProgram.displayName = 'EventProgram';

export default memo(EventProgram);
