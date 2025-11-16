import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import divisionStyles from '../../src/Styles/DivisionStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import { getDivisionById } from '../../src/constants/divisions';
import PrimaryButton from '../../src/components/PrimaryButton';

export default function DivisionDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const styles = useThemedStyles(divisionStyles);
  const { colors } = useTheme();

  const division = useMemo(() => getDivisionById(id), [id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="رجوع"
          >
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            {division?.name || 'تفاصيل الوحدة'}
          </Text>
        </View>

        {/* HERO */}
        <View style={styles.heroCard}>
          {division?.heroImage ? (
            <View>
              <Image
                source={{ uri: division.heroImage }}
                style={styles.heroImage}
              />

              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)']}
                style={styles.heroOverlay}
              >
                <View style={styles.heroTitleRow}>
                  {division?.icon ? (
                    <Text style={[styles.heroIcon, { color: colors.white }]}>
                      {division.icon}
                    </Text>
                  ) : null}

                  <Text style={styles.heroName}>{division?.name}</Text>
                </View>

                {division?.ageRange ? (
                  <Text style={styles.heroAge}>{division.ageRange}</Text>
                ) : null}
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.heroFallback}>
              <Ionicons
                name="people-outline"
                size={32}
                color={colors.subText}
              />
              <Text style={styles.heroName}>{division?.name}</Text>
              {division?.ageRange ? (
                <Text style={styles.heroAge}>{division.ageRange}</Text>
              ) : null}
            </View>
          )}
        </View>

        {/* INFO CARDS */}
        {division && (
          <View style={styles.infoGrid}>
            {/* Age Range */}
            <View style={styles.infoCard}>
              <View style={styles.infoLabelRow}>
                <Ionicons
                  name="hourglass-outline"
                  size={18}
                  color={colors.primary}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoLabel}>الفئة العمرية</Text>
              </View>
              <Text style={styles.infoText}>{division.ageRange}</Text>
            </View>

            {/* About the Division */}
            <View style={styles.infoCard}>
              <View style={styles.infoLabelRow}>
                <Ionicons
                  name="information-circle-outline"
                  size={18}
                  color={colors.primary}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoLabel}>عن الوحدة</Text>
              </View>
              <Text style={styles.infoText}>{division.description}</Text>
            </View>

            {/* Mission */}
            <View style={styles.infoCard}>
              <View style={styles.infoLabelRow}>
                <Ionicons
                  name="flag-outline"
                  size={18}
                  color={colors.primary}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoLabel}>الرسالة والأهداف</Text>
              </View>
              <Text style={styles.infoText}>{division.mission}</Text>
            </View>

            {/* Skills */}
            {division.skills?.length ? (
              <View style={styles.infoCard}>
                <View style={styles.infoLabelRow}>
                  <Ionicons
                    name="star-outline"
                    size={18}
                    color={colors.primary}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoLabel}>المهارات المكتسبة</Text>
                </View>

                <View style={styles.skillChipRow}>
                  {division.skills.map((skill) => (
                    <View key={skill} style={styles.skillChip}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        )}

        {/* MEMBERS */}
        {division?.leaders?.length || division?.members?.length ? (
          <View>
            {/* Leaders - unchanged */}
            <Text style={styles.sectionTitle}>القادة</Text>

            <View style={styles.membersGrid}>
              {division.leaders.map((leader) => {
                const initials = leader.name
                  ? leader.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')
                  : '?';

                return (
                  <View key={leader.id} style={styles.memberCard}>
                    {leader.avatar ? (
                      <Image
                        source={{ uri: leader.avatar }}
                        style={styles.memberAvatar}
                      />
                    ) : (
                      <View style={styles.memberFallbackAvatar}>
                        <Text style={styles.memberInitials}>{initials}</Text>
                      </View>
                    )}

                    <Text style={styles.memberName}>{leader.name}</Text>
                    <Text style={styles.memberRole}>{leader.role}</Text>
                    {leader.badge ? (
                      <Text style={styles.memberBadge}>{leader.badge}</Text>
                    ) : null}
                  </View>
                );
              })}
            </View>

            {/* Horizontal Members Carousel */}
            {division.members?.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>الأعضاء</Text>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.memberCarousel}
                >
                  {division.members.map((member) => {
                    const initials = member.name
                      ? member.name
                          .split(' ')
                          .map((p) => p[0])
                          .join('')
                      : '?';

                    return (
                      <View
                        key={member.id}
                        style={styles.memberCarouselCard}
                        accessibilityRole="button"
                        accessibilityLabel={member.name}
                      >
                        {member.avatar ? (
                          <Image
                            source={{ uri: member.avatar }}
                            style={styles.memberCarouselAvatar}
                          />
                        ) : (
                          <View style={styles.memberFallbackAvatar}>
                            <Text style={styles.memberInitials}>
                              {initials}
                            </Text>
                          </View>
                        )}

                        <Text style={styles.memberName}>{member.name}</Text>
                        <Text style={styles.memberRole}>{member.role}</Text>
                        {member.badge ? (
                          <Text style={styles.memberBadge}>{member.badge}</Text>
                        ) : null}
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </View>
        ) : null}

        {/* ACTIVITIES */}
        {division?.activities?.length ? (
          <View style={styles.activitiesList}>
            <Text style={styles.sectionTitle}>أهم الأنشطة</Text>

            {division.activities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={styles.activityIconWrapper}>
                  <Ionicons
                    name={activity.icon || 'compass-outline'}
                    size={20}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.activityBody}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDesc}>
                    {activity.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {/* CTA BUTTON */}
        <View style={styles.ctaWrapper}>
          <PrimaryButton
            label="انضم إلى هذه الوحدة"
            onPress={() => router.push({ pathname: '/competitions/join' })}
            accessibilityLabel="انضم إلى هذه الوحدة"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
