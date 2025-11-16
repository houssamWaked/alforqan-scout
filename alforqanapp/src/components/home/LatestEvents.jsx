import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import homeStyles from '../../Styles/HomeStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { HOME_TEXT } from '../../../constants/texts/homeTexts';

export default function LatestEvents({ events }) {
  const styles = useThemedStyles(homeStyles);
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.eventCard}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{HOME_TEXT.latestEventsTitle}</Text>
      <FlatList
        data={events}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
