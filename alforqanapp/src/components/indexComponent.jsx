import React, { useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Styles/indexStyleSheet';
import colors from '../../constants/colors';
import typography from '../../constants/typography';

export default function IndexComponent() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(1.12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        stiffness: 200,
        damping: 12,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, logoScale]);

  const animatedContentStyle = {
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

  const handleExplorePress = useCallback(async () => {
    try {
      await AsyncStorage.setItem('hasSeenWelcome', 'true');
      router.replace('/(tabs)/Home');
    } catch (error) {
      console.error('Failed to save onboarding state', error);
    }
  }, [router]);

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Animated.View style={[styles.contentBox, animatedContentStyle]}>
        <View style={styles.logoCircle}>
          <Animated.Image
            source={require('../../assets/images/Logo.png')}
            style={[styles.logo, { transform: [{ scale: logoScale }] }]}
          />
        </View>

        <Text style={[typography.headings.h2, styles.title]}>
          كشافة الفرقان الإسلامي
        </Text>

        <Text style={[typography.headings.h3, styles.subtitle]}>
          كن مستعداً
        </Text>

        <Text style={[typography.body.small, styles.description]}>
          نغرس قيم الإيمان، القيادة، والخدمة في شبابنا لبناء جيل ملتزم يخدم وطنه
          وأمته.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleExplorePress}>
          <Text style={styles.buttonText}>استكشف المزيد</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}
