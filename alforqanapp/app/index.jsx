import React from 'react';
import { View } from 'react-native';

import IndexComponent from '../src/components/indexComponent';
import { useTheme } from '../src/hooks/useTheme';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <IndexComponent />
    </View>
  );
}
