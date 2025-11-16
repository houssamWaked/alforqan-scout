import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import homeStyles from '../../Styles/HomeStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';

export default function HomeComponent() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const url =
    'https://raw.githubusercontent.com/houssamWaked/alforqan-scout/main/alforqanapp/src/Data/achievements.json';

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const cached = await AsyncStorage.getItem('cache_achievements');
        if (cached) setAchievements(JSON.parse(cached).slice(0, 3));

        const res = await fetch(url);
        const json = await res.json();
        setAchievements(json.slice(0, 3));
        await AsyncStorage.setItem('cache_achievements', JSON.stringify(json));
      } catch (err) {
        console.error('Error loading achievements:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAchievements();
  }, []);

  const styles = useThemedStyles(homeStyles);
  const { colors, scheme, toggleScheme } = useTheme();

  const topThree = useMemo(
    () => achievements.slice(0, 3),
    [achievements]
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logo}
        />
        <Text style={styles.greeting}>كشافة الفرقان الإسلامي</Text>
        <Text style={styles.motto}>كن مستعداً دائمًا لخدمة الله والوطن</Text>
      </View>

      <TouchableOpacity style={styles.themeToggle} onPress={toggleScheme}>
        <Text style={styles.themeToggleText}>
          {scheme === 'dark' ? 'تفعيل وضع النهار' : 'تفعيل الوضع الليلي'}
        </Text>
      </TouchableOpacity>

      {/* Latest Achievements */}
      <Text style={styles.sectionTitle}>آخر الإنجازات</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 6 }}
        >
          {topThree.map((item) => (
            <View key={item.id} style={styles.achievementCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.achievementImg}
              />
              <Text style={styles.achievementYear}>{item.year}</Text>
              <Text style={styles.achievementTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* More button navigates to Achievements tab */}
      <Link href="/(tabs)/Achievements" asChild>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreText}>عرض المزيد</Text>
        </TouchableOpacity>
      </Link>

      {/* Inspirational Quote */}
      <View style={styles.quoteBox}>
        <Text style={styles.quote}>
          “القائد الناجح هو من يخدم قبل أن يُخدم.”
        </Text>
      </View>

      {/* Optional footer motto */}
      <Text style={styles.footerText}>
        نغرس قيم الإيمان، القيادة، والخدمة في شبابنا لبناء جيل ملتزم يخدم وطنه
        وأمته.
      </Text>
    </ScrollView>
  );
}
