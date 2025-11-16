import { StyleSheet } from 'react-native';
import { COLOR_SCHEMES } from '../../constants/colors';
import sizing from '../../constants/sizing';

const createStyles = (palette) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.background,
    },
    scroll: {
      flex: 1,
    },
    container: {
      maxWidth: 520,
      width: '100%',
      alignSelf: 'center',
      paddingHorizontal: sizing.spacing.md,
      paddingTop: sizing.spacing.md,
      paddingBottom: sizing.spacing.xl,
    },

    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: sizing.spacing.md,
    },
    backButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.card,
      borderWidth: 1,
      borderColor: palette.border,
      marginRight: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: palette.text,
      textAlign: 'right',
      flex: 1,
    },

    heroCard: {
      borderRadius: sizing.radius.lg,
      overflow: 'hidden',
      marginBottom: sizing.spacing.lg,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.card,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 8,
      elevation: 4,
    },
    heroImage: {
      width: '100%',
      height: 200,
    },
    heroFallback: {
      width: '100%',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.light.secondary,
    },
    heroOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: sizing.spacing.md,
      backgroundColor: 'rgba(0,0,0,0.35)',
    },
    heroTitleRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    heroIcon: {
      fontSize: 24,
      marginLeft: 6,
    },
    heroName: {
      color: palette.white,
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'right',
    },
    heroAge: {
      marginTop: 4,
      color: palette.white,
      fontSize: 13,
      textAlign: 'right',
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: palette.text,
      marginBottom: sizing.spacing.sm,
      textAlign: 'right',
    },

    infoGrid: {
      marginBottom: sizing.spacing.lg,
    },
    infoCard: {
      backgroundColor: palette.card,
      borderRadius: sizing.radius.md,
      padding: sizing.spacing.md,
      borderWidth: 1,
      borderColor: palette.border,
      marginBottom: sizing.spacing.sm,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 2,
    },
    infoLabelRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 4,
    },
    infoIcon: {
      marginLeft: 6,
    },
    infoLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: palette.text,
      textAlign: 'right',
    },
    infoText: {
      fontSize: 13,
      color: palette.subText,
      lineHeight: 20,
      textAlign: 'right',
    },
    skillChipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      marginTop: sizing.spacing.xs,
    },
    skillChip: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: palette.light.secondary,
      marginLeft: 6,
      marginBottom: 6,
    },
    skillText: {
      fontSize: 12,
      color: palette.text,
    },

    membersGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: sizing.spacing.lg,
    },
    memberCard: {
      width: '48%',
      backgroundColor: palette.card,
      borderRadius: sizing.radius.md,
      padding: sizing.spacing.sm,
      marginBottom: sizing.spacing.md,
      borderWidth: 1,
      borderColor: palette.border,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 2,
      alignItems: 'flex-end',
    },
    memberAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginBottom: 8,
      alignSelf: 'flex-start',
    },
    memberFallbackAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginBottom: 8,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      backgroundColor: palette.light.secondary,
    },
    memberInitials: {
      fontSize: 18,
      fontWeight: '700',
      color: palette.text,
    },
    memberName: {
      fontSize: 14,
      fontWeight: '600',
      color: palette.text,
      textAlign: 'right',
    },
    memberRole: {
      fontSize: 12,
      color: palette.subText,
      marginTop: 2,
      textAlign: 'right',
    },
    memberBadge: {
      fontSize: 16,
      marginTop: 4,
      textAlign: 'right',
    },
    memberCarousel: {
      paddingHorizontal: sizing.spacing.xs,
      paddingBottom: sizing.spacing.sm,
    },
    memberCarouselCard: {
      width: 120,
      backgroundColor: palette.card,
      borderRadius: sizing.radius.md,
      paddingVertical: sizing.spacing.sm,
      paddingHorizontal: sizing.spacing.xs,
      marginRight: sizing.spacing.sm,
      borderWidth: 1,
      borderColor: palette.border,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    memberCarouselAvatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginBottom: 6,
    },

    activitiesList: {
      marginBottom: sizing.spacing.lg,
    },
    activityCard: {
      backgroundColor: palette.card,
      borderRadius: sizing.radius.md,
      padding: sizing.spacing.md,
      borderWidth: 1,
      borderColor: palette.border,
      marginBottom: sizing.spacing.sm,
      flexDirection: 'row',
      alignItems: 'flex-start',
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 2,
    },
    activityIconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.light.secondary,
      marginRight: 10,
    },
    activityBody: {
      flex: 1,
    },
    activityTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: palette.text,
      textAlign: 'right',
      marginBottom: 2,
    },
    activityDesc: {
      fontSize: 12,
      color: palette.subText,
      lineHeight: 18,
      textAlign: 'right',
    },

    ctaWrapper: {
      marginTop: sizing.spacing.sm,
    },
  });

const divisionStyles = {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};

export default divisionStyles;
