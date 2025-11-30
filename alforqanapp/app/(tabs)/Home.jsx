// app/(tabs)/Home.jsx
import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import PinnedAnnouncement from '../../src/components/home/PinnedAnnouncement';
import NewsSection from '../../src/components/home/NewsSection';
import LatestEvents from '../../src/components/home/LatestEvents';
import QuickActions from '../../src/components/home/QuickActions';
import SettingsModal from '../../src/components/home/SettingsModal';

import { useAnnouncements } from '../../src/hooks/useAnnouncements';
import { useLatestEvents } from '../../src/hooks/useLatestEvents';
import { useNews } from '../../src/hooks/useNews';
import { HOME_TEXT } from '../../constants/texts/homeTexts';

import homeStyles from '../../src/Styles/HomeStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';

// Reusable visual divider
function SectionDivider({ styles }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.line} />
      <View style={styles.line} />
    </View>
  );
}

export default function HomeScreen() {
  const styles = useThemedStyles(homeStyles);
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    data: pinnedAnnouncement,
    loading: announcementLoading,
    error: announcementError,
  } = useAnnouncements();

  const {
    data: events,
    loading: eventsLoading,
    error: eventsError,
  } = useLatestEvents();

  const { data: newsItems, loading: newsLoading, error: newsError } = useNews();

  const [settingsVisible, setSettingsVisible] = useState(false);

  const openSettings = useCallback(() => setSettingsVisible(true), []);
  const closeSettings = useCallback(() => setSettingsVisible(false), []);
  const handleEventPress = useCallback(
    (event) => {
      if (!event?.id) return;
      router.push({
        pathname: '/events/[id]',
        params: { id: String(event.id) },
      });
    },
    [router]
  );

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <SettingsModal visible={settingsVisible} onClose={closeSettings} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: (styles.container?.paddingBottom || 0) + insets.bottom + 56 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* SETTINGS BUTTON */}
        <View style={styles.settingsRow}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={openSettings}
            activeOpacity={0.8}
          >
            <Ionicons name="settings-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* PINNED ANNOUNCEMENT */}
        {announcementLoading ? (
          <View style={styles.loadingInline}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : announcementError ? (
          <Text style={styles.errorText}>{HOME_TEXT.announcementsError}</Text>
        ) : (
          <PinnedAnnouncement announcement={pinnedAnnouncement} />
        )}

        {/* SECTION DIVIDER */}
        <SectionDivider styles={styles} />

        {/* NEWS */}
        <NewsSection
          items={newsItems}
          loading={newsLoading}
          error={newsError}
        />

        {/* EVENTS */}
        {eventsLoading ? (
          <View style={styles.loadingInline}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : eventsError ? (
          <Text style={styles.errorText}>{HOME_TEXT.eventsError}</Text>
        ) : (
          <LatestEvents events={events} onPressEvent={handleEventPress} />
        )}

        {/* QUICK ACTIONS */}
        <QuickActions />
      </ScrollView>
    </SafeAreaView>
  );
}
