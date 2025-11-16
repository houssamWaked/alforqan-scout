import React, { memo } from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';

function PrimaryButton({
  label,
  onPress,
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
}) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          backgroundColor: disabled
            ? colors.muted
            : colors.primary,
          borderRadius: 16,
          paddingVertical: 12,
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
      android_ripple={{
        color: 'rgba(0,0,0,0.08)',
        borderless: false,
      }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
    >
      <Text
        style={[
          {
            color: colors.white,
            fontSize: 15,
            fontWeight: '600',
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default memo(PrimaryButton);

