import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants/colors';

// ================================
// 💾 DataRenderer Component
// ================================
export default function DataRenderer({ type }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // URLs for each dataset
  const urls = {
    about:
      'https://raw.githubusercontent.com/houssamWaked/alforqan-scout/refs/heads/main/alforqanapp/src/Data/about.json',
    achievements:
      'https://raw.githubusercontent.com/houssamWaked/alforqan-scout/refs/heads/main/alforqanapp/src/Data/achievements.json',
    gallery:
      'https://raw.githubusercontent.com/houssamWaked/alforqan-scout/refs/heads/main/alforqanapp/src/Data/gallery.json',
  };

  // ==========================================
  // 🔄 Fetch data with offline caching
  // ==========================================
  const fetchData = async (forceRefresh = false) => {
    const cacheKey = `cache_${type}`;
    try {
      setError(null);
      if (!forceRefresh) {
        // 1️⃣ Try to load cached data first
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          console.log('Loaded cached data:', type);
          setData(JSON.parse(cached));
          setLoading(false);
        }
      }

      // 2️⃣ Fetch fresh data online
      const res = await fetch(urls[type]);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      // 3️⃣ Save to cache
      await AsyncStorage.setItem(cacheKey, JSON.stringify(json));
      console.log('Cache updated:', type);

      setData(json);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err.message);
      setError('Network unavailable — showing saved data.');
      if (!data) {
        // If no data loaded yet, try cache again
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) setData(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load once on mount
  useEffect(() => {
    fetchData();
  }, [type]);

  // Pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchData(true);
  };

  // ==========================================
  // ⏳ Loading State
  // ==========================================
  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  // ==========================================
  // ⚠️ Error Display
  // ==========================================
  if (!data)
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          Failed to load {type} data. {error}
        </Text>
      </View>
    );

  // ==========================================
  // 📜 Render UI
  // ==========================================
  return (
    <ScrollView
      style={{ padding: 16 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {error && (
        <Text
          style={{ color: 'orange', textAlign: 'center', marginBottom: 10 }}
        >
          {error}
        </Text>
      )}

      {/* ====== ABOUT PAGE ====== */}
      {type === 'about' && (
        <View>
          <Text
            style={{ fontSize: 22, fontWeight: 'bold', color: colors.primary }}
          >
            {data.title}
          </Text>
          <Text
            style={{ fontSize: 16, marginVertical: 10, color: colors.text }}
          >
            {data.description}
          </Text>
          <Text style={{ fontWeight: '600', color: colors.text }}>
            الرسالة:
          </Text>
          <Text style={{ color: colors.subText }}>{data.mission}</Text>
          <Text
            style={{ marginTop: 10, fontWeight: '600', color: colors.text }}
          >
            القيم:
          </Text>
          {data.values?.map((val, i) => (
            <Text key={i} style={{ color: colors.subText }}>
              • {val}
            </Text>
          ))}
        </View>
      )}

      {/* ====== ACHIEVEMENTS PAGE ====== */}
      {type === 'achievements' &&
        data.map((item) => (
          <View
            key={item.id}
            style={{
              marginBottom: 16,
              backgroundColor: colors.card,
              borderRadius: 10,
              padding: 12,
              ...{
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                elevation: 3,
              },
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 180, borderRadius: 10 }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 8,
                color: colors.primary,
              }}
            >
              {item.title}
            </Text>
            <Text style={{ color: colors.text }}>{item.description}</Text>
            <Text style={{ color: colors.subText, marginTop: 4 }}>
              📅 {item.year}
            </Text>
          </View>
        ))}

      {/* ====== GALLERY PAGE ====== */}
      {type === 'gallery' && (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {data.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img.image }}
              style={{
                width: '48%',
                height: 150,
                marginBottom: 10,
                borderRadius: 10,
              }}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
