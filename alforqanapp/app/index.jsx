import React from 'react';
import { View, StyleSheet } from 'react-native';

import IndexComponent from '../src/components/indexComponent';
import { useTheme } from '../src/hooks/useTheme';

export default function HomeScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <IndexComponent />
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
