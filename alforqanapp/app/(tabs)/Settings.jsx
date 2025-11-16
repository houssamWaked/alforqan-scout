import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import settingsStyles from '../../src/Styles/SettingsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import appConfig from '../../app.json';

const APP_VERSION = appConfig.expo?.version ?? '1.0.0';

export default function SettingsScreen() {
  const styles = useThemedStyles(settingsStyles);
  const { scheme, toggleScheme } = useTheme();
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [eventNotifications, setEventNotifications] = useState(true);
  const [competitionNotifications, setCompetitionNotifications] = useState(true);
  const [announcementNotifications, setAnnouncementNotifications] = useState(true);

  const handleAction = (label) => {
    Alert.alert(label, 'سيتم تنفيذ الإجراء قريباً.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>🔧 App Settings</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View>
                <Text style={styles.rowLabel}>Theme</Text>
                <Text style={styles.rowIntro}>
                  {scheme === 'dark' ? 'الوضع الليلي' : 'الوضع النهاري'}
                </Text>
              </View>
              <TouchableOpacity style={styles.actionButton} onPress={toggleScheme}>
                <Text style={styles.actionLabel}>
                  {scheme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <View>
                <Text style={styles.rowLabel}>Language</Text>
                <Text style={styles.rowIntro}>Arabic (عربي)</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View>
                <Text style={styles.rowLabel}>Font Size</Text>
                <Text style={styles.rowIntro}>Medium</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Enable Animations</Text>
              <Switch
                onValueChange={setAnimationsEnabled}
                value={animationsEnabled}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Data Saver Mode</Text>
              <Switch onValueChange={setDataSaver} value={dataSaver} />
            </View>
          </View>
        </View>

        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Event Notifications</Text>
              <Switch
                onValueChange={setEventNotifications}
                value={eventNotifications}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Competition Notifications</Text>
              <Switch
                onValueChange={setCompetitionNotifications}
                value={competitionNotifications}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Announcement Notifications</Text>
              <Switch
                onValueChange={setAnnouncementNotifications}
                value={announcementNotifications}
              />
            </View>
          </View>
        </View>

        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>🗂 Data</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAction('Clear Cache')}
            >
              <Text style={styles.actionLabel}>Clear Cache</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAction('Reset Onboarding')}
            >
              <Text style={styles.actionLabel}>Reset Onboarding</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>❓ Help</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAction('FAQ')}
            >
              <Text style={styles.actionLabel}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAction('Contact Us')}
            >
              <Text style={styles.actionLabel}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAction('Report Issue')}
            >
              <Text style={styles.actionLabel}>Report Issue</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>ℹ️ About</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAction('About the app')}
            >
              <Text style={styles.actionLabel}>About the app</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAction('Privacy policy')}
            >
              <Text style={styles.actionLabel}>Privacy policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAction('Terms')}
            >
              <Text style={styles.actionLabel}>Terms</Text>
            </TouchableOpacity>
            <View style={styles.versionRow}>
              <Text style={styles.versionLabel}>Version</Text>
              <Text style={styles.versionLabel}>{APP_VERSION}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
