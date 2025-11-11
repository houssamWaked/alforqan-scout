import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles/AchievementsStyleSheet';
import colors from '../../constants/colors';

export default function AchievementsComponent() {
  const [achievements, setAchievements] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState('الكل');

  const categories = ['الكل', 'خدمة المجتمع', 'المخيمات', 'المسابقات'];

  const url =
    'https://raw.githubusercontent.com/houssamWaked/alforqan-scout/main/alforqanapp/src/Data/achievements.json';

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = 'cache_achievements';
      try {
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          setAchievements(JSON.parse(cached));
          setFiltered(JSON.parse(cached));
        }
        const res = await fetch(url);
        const json = await res.json();
        setAchievements(json);
        setFiltered(json);
        await AsyncStorage.setItem(cacheKey, JSON.stringify(json));
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchData();
  }, []);

  const filterByCategory = (cat) => {
    setSelected(cat);
    if (cat === 'الكل') setFiltered(achievements);
    else setFiltered(achievements.filter((a) => a.category === cat));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>الإنجازات</Text>

      {/* Filter buttons */}
      <View style={styles.filterRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterButton,
              selected === cat && styles.filterButtonActive,
            ]}
            onPress={() => filterByCategory(cat)}
          >
            <Text
              style={[
                styles.filterText,
                selected === cat && styles.filterTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cards */}
      <View style={styles.cardGrid}>
        {filtered.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.year}>{item.year}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
