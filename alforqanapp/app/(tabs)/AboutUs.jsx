import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, RefreshControl } from 'react-native';

import aboutStyles from '../../src/Styles/AboutUsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import { useAboutUs } from '../../src/hooks/useAboutUs';
import { ABOUT_TEXT } from '../../constants/texts/aboutTexts';

import AboutHero from '../../src/components/about/AboutHero';
import AboutSections from '../../src/components/about/AboutSections';
import AboutTimeline from '../../src/components/about/AboutTimeline';
import AboutUnits from '../../src/components/about/AboutUnits';
import AboutLoading from '../../src/components/about/AboutLoading';
import AboutErrorState from '../../src/components/about/AboutErrorState';
import AboutEmptyState from '../../src/components/about/AboutEmptyState';

export default function AboutUsScreen() {
  const styles = useThemedStyles(aboutStyles);
  const { colors } = useTheme();

  const { data, loading, error, refresh, refreshing } = useAboutUs();

  const hasData = !!data;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={refresh}
            tintColor={colors.primary}
          />
        }
      >
        {loading && !hasData ? (
          <AboutLoading />
        ) : error ? (
          <AboutErrorState message={error || ABOUT_TEXT.errorMessage} />
        ) : !hasData ? (
          <AboutEmptyState />
        ) : (
          <>
            <AboutHero hero={data.hero} />
            <AboutSections title={data.title} sections={data.sections} />
            <AboutTimeline
              label={data.timelineLabel}
              timeline={data.timeline}
            />
            <AboutUnits
              label={data.unitsLabel}
              units={data.units}
              unitButtonLabel={data.unitButtonLabel}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
