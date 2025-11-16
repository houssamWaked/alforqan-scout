import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PinnedAnnouncement from '../../src/components/home/PinnedAnnouncement';
import LatestEvents from '../../src/components/home/LatestEvents';
import QuickActions from '../../src/components/home/QuickActions';

import { useAnnouncements } from '../../src/hooks/useAnnouncements';
import { useLatestEvents } from '../../src/hooks/useLatestEvents';
import homeStyles from '../../src/Styles/HomeStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';

export default function HomeScreen() {
  const announcement = useAnnouncements();
  const events = useLatestEvents();
  const styles = useThemedStyles(homeStyles);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        {/* TOP — PINNED ANNOUNCEMENT */}
        <PinnedAnnouncement announcement={announcement} />

        {/* SECTION TITLE */}
        <View style={styles.sectionHeader}>
          <View style={styles.line} />
          <View style={styles.line} />
        </View>

        {/* LATEST EVENTS */}
        <LatestEvents events={events} />

        {/* QUICK ACTIONS */}
        <QuickActions />
      </ScrollView>
    </SafeAreaView>
  );
}
