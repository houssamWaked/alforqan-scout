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
      maxWidth: 540,
      width: '100%',
      alignSelf: 'center',
      paddingHorizontal: sizing.spacing.md,
      paddingTop: sizing.spacing.md,
      paddingBottom: 40,
    },
    loadingWrapper: {
      paddingVertical: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyWrapper: {
      paddingVertical: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorText: {
      textAlign: 'center',
      color: palette.danger,
      marginVertical: 12,
      fontSize: 14,
    },
    emptyText: {
      textAlign: 'center',
      color: palette.subText,
      marginVertical: 12,
      fontSize: 14,
      lineHeight: 20,
    },
    // Hero
    heroCard: {
      borderRadius: 20,
      overflow: 'hidden',
      height: 180,
      marginBottom: sizing.spacing.lg,
      backgroundColor: palette.card,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 10,
      elevation: 5,
    },
    heroImage: {
      resizeMode: 'cover',
    },
    heroOverlay: {
      backgroundColor: 'rgba(0,0,0,0.35)',
      flex: 1,
      justifyContent: 'flex-end',
      padding: sizing.spacing.md,
    },
    heroText: {
      color: palette.white,
      fontSize: 20,
      fontWeight: '700',
    },
    // Intro sections
    introCard: {
      backgroundColor: palette.card,
      borderRadius: 20,
      padding: sizing.spacing.lg,
      marginBottom: sizing.spacing.lg,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 10,
      elevation: 5,
    },
    screenTitle: {
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'center',
      color: palette.text,
      marginBottom: sizing.spacing.sm,
    },
    sectionLabel: {
      fontSize: 18,
      fontWeight: '700',
      color: palette.text,
      marginBottom: sizing.spacing.sm,
      textAlign: 'right',
    },
    sectionText: {
      fontSize: 14,
      color: palette.subText,
      lineHeight: 20,
      marginBottom: sizing.spacing.md,
      textAlign: 'right',
    },
    sectionBlock: {
      marginBottom: 10,
    },
    // Timeline
    timelineCard: {
      backgroundColor: palette.card,
      borderRadius: 18,
      padding: sizing.spacing.md,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: palette.border,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 3,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    timelineBadge: {
      width: 58,
      height: 58,
      borderRadius: 16,
      backgroundColor: palette.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    timelineYear: {
      color: palette.white,
      fontWeight: '700',
      fontSize: 16,
    },
    timelineBody: {
      flex: 1,
    },
    timelineTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: palette.text,
      marginBottom: 4,
      textAlign: 'right',
    },
    timelineDesc: {
      fontSize: 13,
      color: palette.subText,
      lineHeight: 18,
      textAlign: 'right',
    },
    // Units
    unitsLabel: {
      fontSize: 18,
      fontWeight: '700',
      color: palette.text,
      marginBottom: sizing.spacing.sm,
      textAlign: 'right',
    },
    unitGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: sizing.spacing.lg,
    },
    unitCard: {
      width: '48%',
      backgroundColor: palette.card,
      borderRadius: 18,
      padding: sizing.spacing.md,
      marginBottom: sizing.spacing.md,
      borderWidth: 1,
      borderColor: palette.border,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 3,
    },
    unitIcon: {
      fontSize: 22,
      color: palette.primary,
      marginBottom: 8,
      textAlign: 'center',
    },
    unitTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: palette.text,
      marginBottom: 4,
      textAlign: 'right',
    },
    unitAge: {
      fontSize: 13,
      color: palette.primary,
      marginBottom: 4,
      textAlign: 'right',
    },
    unitDesc: {
      fontSize: 13,
      color: palette.subText,
      textAlign: 'right',
      lineHeight: 18,
      marginBottom: 10,
    },
    unitButton: {
      backgroundColor: palette.light.secondary,
      borderRadius: 12,
      paddingVertical: 8,
      alignItems: 'center',
    },
    unitButtonLabel: {
      color: palette.text,
      fontWeight: '600',
    },
  });

export default {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};
