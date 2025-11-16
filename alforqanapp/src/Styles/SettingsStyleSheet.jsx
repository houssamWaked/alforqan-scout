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
      padding: sizing.spacing.md,
      paddingBottom: 32,
    },
    sectionWrapper: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: palette.text,
      marginBottom: 12,
    },
    card: {
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: sizing.spacing.md,
      borderWidth: 1,
      borderColor: palette.border,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    rowLabel: {
      color: palette.text,
      fontSize: 16,
    },
    rowIntro: {
      color: palette.subText,
      fontSize: 13,
      marginBottom: 4,
    },
    actionButton: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.border,
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: palette.light.secondary,
      marginTop: 8,
    },
    actionLabel: {
      color: palette.text,
      fontWeight: '600',
    },
    versionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
    },
    versionLabel: {
      color: palette.subText,
      fontSize: 13,
    },
  });

const settingsStyles = {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};

export default settingsStyles;
