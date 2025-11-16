import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';

import aboutStyles from '../Styles/AboutUsStyleSheet';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useTheme } from '../hooks/useTheme';

function AboutUsComponent({
  title,
  sections,
  timelineLabel,
  timeline,
  unitsLabel,
  units,
  hero,
  unitButtonLabel,
}) {
  const styles = useThemedStyles(aboutStyles);
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <>
      <View style={styles.introCard}>
        <Text style={[styles.screenTitle, { color: colors.primary }]}>{title}</Text>
        {sections?.map((section) => (
          <View key={section.title} style={{ marginBottom: 10 }}>
            <Text style={styles.sectionLabel}>{section.title}</Text>
            <Text style={styles.sectionText}>{section.description}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionLabel}>{timelineLabel}</Text>
      {timeline?.map((entry) => (
        <View key={entry.year} style={styles.timelineCard}>
          <View style={styles.timelineBadge}>
            <Text style={styles.timelineYear}>{entry.year}</Text>
          </View>
          <View style={styles.timelineBody}>
            <Text style={styles.timelineTitle}>{entry.title}</Text>
            <Text style={styles.timelineDesc}>{entry.description}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionLabel}>{unitsLabel}</Text>
      <View style={styles.unitGrid}>
        {units?.map((unit, index) => {
          const divisionId =
            index === 0 ? 'ashbal' : index === 1 ? 'scouts' : 'rovers';
          return (
            <TouchableOpacity
              key={unit.title}
              style={styles.unitCard}
              activeOpacity={0.9}
              accessibilityRole="button"
              accessibilityLabel={unit.title}
              onPress={() =>
                router.push({
                  pathname: '/divisions/[id]',
                  params: { id: divisionId },
                })
              }
            >
              <Text style={styles.unitIcon}>{unit.icon}</Text>
              <Text style={styles.unitTitle}>{unit.title}</Text>
              <Text style={styles.unitAge}>{unit.age}</Text>
              <Text style={styles.unitDesc}>{unit.description}</Text>
              <View style={styles.unitButton}>
                <Text style={styles.unitButtonLabel}>{unitButtonLabel}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {hero && (
        <ImageBackground
          source={{ uri: hero.image }}
          style={styles.heroBanner}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroText}>{hero.text}</Text>
          </View>
        </ImageBackground>
      )}
    </>
  );
}

export default memo(AboutUsComponent);
