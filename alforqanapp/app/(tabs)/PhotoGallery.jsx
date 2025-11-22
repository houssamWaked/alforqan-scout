// app/(tabs)/PhotoGallery.jsx
import React from 'react';
import { ScrollView, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import galleryStyles from '../../src/Styles/PhotoGallery';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useGallery } from '../../src/hooks/useGallery';

import SectionHeader from '../../src/components/SectionHeader';
import PhotoGrid from '../../src/components/gallery/PhotoGrid';
import FilterChip from '../../src/components/gallery/FilterChip';

import { GALLERY_TEXT } from '../../constants/texts/galleryTexts';
import { useTheme } from '../../src/hooks/useTheme';

export default function PhotoGalleryScreen() {
  const styles = useThemedStyles(galleryStyles);
  const { colors } = useTheme();

  const {
    filteredImages,
    loading,
    error,
    refreshing,
    refresh,
    filters,
    activeFilter,
    setActiveFilter,
  } = useGallery();

  const isEmpty = !loading && filteredImages.length === 0;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.primary}
          />
        }
      >
        <SectionHeader title={GALLERY_TEXT.pageTitle} />

        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* FILTERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <FilterChip
              key={filter.id}
              label={filter.label}
              active={activeFilter === filter.id}
              onPress={() => setActiveFilter(filter.id)}
            />
          ))}
        </ScrollView>

        {/* EMPTY STATE */}
        {isEmpty ? (
          <Text style={styles.emptyText}>{GALLERY_TEXT.emptyText}</Text>
        ) : (
          <PhotoGrid images={filteredImages} loading={loading} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
