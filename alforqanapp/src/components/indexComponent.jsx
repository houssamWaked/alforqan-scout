import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { useFadeAndScale } from '../hooks/useFadeAndScale';
import { setOnboardingSeen } from '../services/onboardingService';

import stylesSheet from '../Styles/indexStyleSheet';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useTheme } from '../hooks/useTheme';
import typography from '../../constants/typography';
import TEXT from '../../constants/texts/indexText';

export default function IndexComponent() {
  const router = useRouter();
  const { fadeAnim, scaleAnim } = useFadeAndScale();
  const styles = useThemedStyles(stylesSheet);
  const { colors } = useTheme();

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [
      {
        translateY: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [24, 0],
        }),
      },
    ],
  };

  const handleExplore = async () => {
    await setOnboardingSeen();
    router.replace('/(tabs)/Home');
  };

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Animated.View style={[styles.contentBox, animatedStyle]}>
        <View style={styles.logoCircle}>
          <Animated.Image
            source={require('../../assets/images/Logo.png')}
            style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
          />
        </View>

        <Text style={[typography.headings.h2, styles.title]}>{TEXT.title}</Text>
        <Text style={[typography.headings.h3, styles.subtitle]}>
          {TEXT.subtitle}
        </Text>
        <Text style={[typography.body.small, styles.description]}>
          {TEXT.description}
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleExplore}>
          <Text style={styles.buttonText}>{TEXT.exploreButton}</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}
