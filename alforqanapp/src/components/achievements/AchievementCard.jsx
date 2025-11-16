// components/achievements/AchievementCard.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function AchievementCard({ achievement, styles }) {
  if (!styles) return null;
  return (
    <TouchableOpacity style={styles.card}>
      {achievement.image && (
        <Image source={{ uri: achievement.image }} style={styles.cardImage} />
      )}

      <View style={styles.cardHeaderRow}>
        <View style={styles.badgeBubble}>
          <Text style={styles.badgeText}>{achievement.badge}</Text>
        </View>
        <Text style={styles.yearText}>{achievement.year}</Text>
      </View>

      <Text style={styles.cardTitle} numberOfLines={2}>
        {achievement.title}
      </Text>

      <Text style={styles.cardDescription} numberOfLines={2}>
        {achievement.description}
      </Text>
    </TouchableOpacity>
  );
}
