import React, { useEffect } from 'react';
import { View } from 'react-native';

import IndexComponent from '../src/components/indexComponent';
import colors from '../constants/colors';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <IndexComponent />
    </View>
  );
}
