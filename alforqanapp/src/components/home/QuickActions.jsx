import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
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
        <Pressable
          key={action.id}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && { transform: [{ scale: 0.97 }] },
          ]}
          onPress={() => router.push(action.route)}
          android_ripple={{ color: 'rgba(0,0,0,0.06)', borderless: false }}
          accessibilityRole="button"
          accessibilityLabel={action.title}
        >
          <Image source={action.icon} style={styles.actionIcon} />
          <Text style={styles.actionText}>{action.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}
