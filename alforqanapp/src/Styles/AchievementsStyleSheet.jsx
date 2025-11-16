import { StyleSheet } from 'react-native';
import { COLOR_SCHEMES } from '../../constants/colors';

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
      maxWidth: 480,
      width: '100%',
      alignSelf: 'center',
      padding: 16,
      paddingBottom: 40,
    },

    pageTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: palette.text,
      marginBottom: 12,
    },

    filtersContainer: {
      paddingVertical: 8,
      paddingHorizontal: 2,
      marginBottom: 10,
    },
    filterChip: {
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.border,
      marginRight: 8,
      backgroundColor: palette.card,
    },
    filterChipActive: {
      backgroundColor: palette.primary,
      borderColor: palette.primary,
    },
    filterText: {
      fontSize: 13,
      color: palette.subText,
    },
    filterTextActive: {
      color: palette.white,
      fontWeight: '600',
    },

    listWrapper: {
      marginTop: 4,
    },
    listContent: {
      paddingBottom: 20,
    },

    filterRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 12,
    },
    filterButton: {
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.border,
      marginRight: 8,
      marginBottom: 8,
      backgroundColor: palette.card,
    },
    filterButtonActive: {
      backgroundColor: palette.primary,
      borderColor: palette.primary,
    },
    cardGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },

    card: {
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: 10,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 3,
    },
    cardImage: {
      width: '100%',
      height: 130,
      borderRadius: 14,
      marginBottom: 8,
    },
    cardHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    badgeBubble: {
      backgroundColor: palette.light.secondary,
      borderRadius: 999,
      paddingVertical: 4,
      paddingHorizontal: 10,
    },
    badgeText: {
      fontSize: 13,
      color: palette.text,
    },
    yearText: {
      fontSize: 12,
      color: palette.subText,
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: palette.text,
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 12,
      color: palette.subText,
      lineHeight: 18,
    },

    emptyStateWrapper: {
      marginTop: 20,
    },
    year: {
      fontSize: 12,
      color: palette.subText,
      marginBottom: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: palette.text,
    },
    desc: {
      fontSize: 14,
      color: palette.subText,
    },
  });

const achievementStyles = {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};

export default achievementStyles;
