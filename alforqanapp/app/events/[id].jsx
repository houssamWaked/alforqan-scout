import React, { useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Alert,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import eventsStyles from '../../src/Styles/EventsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import {
  getEventById,
  getEventTypeLabel,
  isUpcomingEvent,
} from '../../src/constants/events';
import PrimaryButton from '../../src/components/PrimaryButton';
import EventRegisterModal from '../../src/components/events/EventRegisterModal';
import { useEventRegistration } from '../../src/hooks/useEventRegistration';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const styles = useThemedStyles(eventsStyles);
  const { colors } = useTheme();

  const event = useMemo(() => getEventById(id), [id]);

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
  } = useEventRegistration();

  const handleOpenRegistration = useCallback(() => {
    if (!event?.date) return;

    if (!isUpcomingEvent(event.date)) {
      Alert.alert(
        'تم إغلاق التسجيل',
        'لا يمكن التسجيل في هذا النشاط لأنه قد انتهى بالفعل.'
      );
      return;
    }

    open();
  }, [event, open]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.detailHeaderRow}>
          <View style={{ flex: 1 }} />
          <Text style={styles.detailScreenTitle}>
            {event?.title || 'تفاصيل النشاط'}
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.detailBackButton}
            accessibilityRole="button"
            accessibilityLabel="رجوع"
          >
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        {event ? (
          <>
            {/* HERO IMAGE */}
            <View style={styles.heroCard}>
              {event.image ? (
                <View>
                  <Image
                    source={{ uri: event.image }}
                    style={styles.heroImage}
                  />

                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.heroOverlay}
                  >
                    <View style={styles.heroTitleRow}>
                      <Text style={styles.detailTitle} numberOfLines={2}>
                        {event.title}
                      </Text>

                      <View style={styles.detailTypeBadge}>
                        <Text style={styles.detailTypeText}>
                          {getEventTypeLabel(event.type)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.heroMetaRow}>
                      <Text style={styles.heroMetaText}>
                        {event.date} • {event.time}
                      </Text>
                      <Text style={styles.heroMetaText}>{event.location}</Text>
                    </View>
                  </LinearGradient>
                </View>
              ) : (
                <View
                  style={[
                    styles.heroImage,
                    {
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.light?.secondary || colors.card,
                    },
                  ]}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={32}
                    color={colors.subText}
                  />
                  <Text style={{ color: colors.subText, marginTop: 6 }}>
                    {event.title}
                  </Text>
                </View>
              )}
            </View>

            {/* INFO SECTION */}
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>التاريخ</Text>
                <Text style={styles.infoValue}>{event.date}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>الوقت</Text>
                <Text style={styles.infoValue}>{event.time}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>الموقع</Text>
                <Text style={styles.infoValue}>{event.location}</Text>
              </View>

              {event.leader ? (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>القائد المسؤول</Text>
                  <Text style={styles.infoValue}>{event.leader}</Text>
                </View>
              ) : null}
            </View>

            {/* DESCRIPTION */}
            {event.description ? (
              <>
                <Text style={styles.sectionTitle}>وصف النشاط</Text>
                <Text style={styles.descriptionText}>{event.description}</Text>
              </>
            ) : null}

            {/* PROGRAM */}
            {event.program && event.program.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <Text style={styles.sectionTitle}>برنامج النشاط</Text>

                <View>
                  {event.program.map((item, index) => (
                    <View
                      key={`${item.time}-${index}`}
                      style={styles.programItem}
                    >
                      <View style={styles.programTimeColumn}>
                        <Text style={styles.programTime}>{item.time}</Text>
                      </View>

                      <View style={styles.programContent}>
                        <Text style={styles.programTitle}>{item.title}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* EQUIPMENT */}
            {event.equipment && event.equipment.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>التجهيزات المطلوبة</Text>

                <View style={styles.equipmentChipRow}>
                  {event.equipment.map((item, index) => (
                    <View key={`${item}-${index}`} style={styles.equipmentChip}>
                      <Text style={styles.equipmentChipText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* CTA */}
            <View style={styles.ctaWrapper}>
              <PrimaryButton
                label="التسجيل في هذا النشاط"
                onPress={handleOpenRegistration}
              />
            </View>
          </>
        ) : (
          <View style={styles.emptyStateWrapper}>
            <Text style={styles.emptyStateText}>
              تعذّر تحميل تفاصيل النشاط. يرجى التحقق من الاتصال وإعادة المحاولة.
            </Text>
          </View>
        )}

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
      </ScrollView>
    </SafeAreaView>
  );
}
