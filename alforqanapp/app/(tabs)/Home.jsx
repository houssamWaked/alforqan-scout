import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import PinnedAnnouncement from '../../src/components/home/PinnedAnnouncement';
import LatestEvents from '../../src/components/home/LatestEvents';
import QuickActions from '../../src/components/home/QuickActions';

import { useAnnouncements } from '../../src/hooks/useAnnouncements';
import { useLatestEvents } from '../../src/hooks/useLatestEvents';
import homeStyles from '../../src/Styles/HomeStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import SettingsModal from '../../src/components/home/SettingsModal';

export default function HomeScreen() {
  const announcement = useAnnouncements();
  const events = useLatestEvents();
  const styles = useThemedStyles(homeStyles);
  const { colors } = useTheme();
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <View style={styles.settingsRow}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setSettingsVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons
              name="settings-outline"
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

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
