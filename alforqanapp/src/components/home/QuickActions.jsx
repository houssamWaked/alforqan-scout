import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { QUICK_ACTIONS } from '../../../constants/texts/quickActions';
import { useRouter } from 'expo-router';
import homeStyles from '../../Styles/HomeStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

export default function QuickActions() {
  const router = useRouter();
  const styles = useThemedStyles(homeStyles);

  return (
    <View style={styles.actionsContainer}>
      {QUICK_ACTIONS.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.actionButton}
          onPress={() => router.push(action.route)}
        >
          <Image source={action.icon} style={styles.actionIcon} />
          <Text style={styles.actionText}>{action.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
