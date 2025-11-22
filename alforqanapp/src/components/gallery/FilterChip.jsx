import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import galleryStyles from '../../Styles/PhotoGallery';
import { useThemedStyles } from '../../hooks/useThemedStyles';

export default function FilterChip({ label, active, onPress }) {
  const styles = useThemedStyles(galleryStyles);

  return (
    <TouchableOpacity
      style={[styles.filterChip, active && styles.filterChipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
