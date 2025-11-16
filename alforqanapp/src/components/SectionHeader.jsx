import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';

function SectionHeader({ title, subtitle, align = 'right', style }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          marginBottom: 10,
          flexDirection: 'column',
          alignItems: align === 'center' ? 'center' : 'flex-end',
        },
        style,
      ]}
    >
      {subtitle ? (
        <Text
          style={{
            fontSize: 12,
            color: colors.subText,
            marginBottom: 2,
            textAlign: align,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: colors.text,
          textAlign: align,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export default memo(SectionHeader);

