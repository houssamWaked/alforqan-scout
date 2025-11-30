import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, RefreshControl, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import eventsStyles from '../../src/Styles/EventsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import { useEventDetail } from '../../src/hooks/useEventDetail';
import { isUpcomingEvent } from '../../src/constants/events';
import { EVENTS_TEXT } from '../../constants/texts/eventsTexts';
import EventRegisterModal from '../../src/components/events/EventRegisterModal';
import { useEventRegistration } from '../../src/hooks/useEventRegistration';

import EventHeader from '../../src/components/events/EventHeader';
import EventHero from '../../src/components/events/EventHero';
import EventInfo from '../../src/components/events/EventInfo';
import EventDescription from '../../src/components/events/EventDescription';
import EventProgram from '../../src/components/events/EventProgram';
import EventEquipment from '../../src/components/events/EventEquipment';
import EventGallery from '../../src/components/events/EventGallery';
import EventCTA from '../../src/components/events/EventCTA';
import EventLoading from '../../src/components/events/EventLoading';
import EventErrorState from '../../src/components/events/EventErrorState';
import EventEmptyState from '../../src/components/events/EventEmptyState';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const styles = useThemedStyles(eventsStyles);
  const { colors } = useTheme();

  const { data, loading, error, refresh, refreshing } = useEventDetail(id);
  const event = data?.event;

  const {
    visible,
    open,
    close,
    name,
    nationality,
    residence,
    participationChoice,
    scoutStatus,
    notes,
    submitting,
    setName,
    setNationality,
    setResidence,
    setParticipationChoice,
    setScoutStatus,
    setNotes,
    handleSubmit,
  } = useEventRegistration({ eventId: event?.id || id });

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleOpenRegistration = useCallback(() => {
    if (!event?.date) return;

    if (!isUpcomingEvent(event.date)) {
      Alert.alert(EVENTS_TEXT.notUpcomingTitle, EVENTS_TEXT.notUpcomingMessage);
      return;
    }

    open();
  }, [event?.date, open]);

  const hasEvent = !!event;

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
        <EventHeader
          title={event?.title || EVENTS_TEXT.detailTitleFallback}
          onBack={handleBack}
        />

        {loading ? (
          <EventLoading />
        ) : error ? (
          <EventErrorState message={error} />
        ) : !hasEvent ? (
          <EventEmptyState />
        ) : (
          <>
            <EventHero event={event} />
            <EventGallery images={event.images} />
            <EventInfo event={event} />
            <EventDescription description={event.description} />
            <EventProgram program={event.program} />
            <EventEquipment equipment={event.equipment} />
            <EventCTA
              label={EVENTS_TEXT.ctaLabel}
              onPress={handleOpenRegistration}
            />
          </>
        )}
      </ScrollView>

      <EventRegisterModal
        visible={visible}
        onClose={close}
        name={name}
        nationality={nationality}
        residence={residence}
        participationChoice={participationChoice}
        scoutStatus={scoutStatus}
        notes={notes}
        submitting={submitting}
        onChangeName={setName}
        onChangeNationality={setNationality}
        onChangeResidence={setResidence}
        onChangeParticipation={setParticipationChoice}
        onChangeScoutStatus={setScoutStatus}
        onChangeNotes={setNotes}
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
}
