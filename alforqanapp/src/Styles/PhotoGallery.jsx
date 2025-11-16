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
      textAlign: 'right',
    },

    filtersContainer: {
      flexDirection: 'row',
      marginBottom: 12,
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

    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },

    imageCard: {
      width: '48%',
      backgroundColor: palette.card,
      borderRadius: 18,
      marginBottom: 12,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 3,
    },

    image: {
      width: '100%',
      height: 150,
    },

    loadingWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },

    emptyText: {
      textAlign: 'center',
      color: palette.subText,
      marginTop: 20,
      fontSize: 14,
    },

    errorText: {
      textAlign: 'center',
      color: palette.danger,
      marginBottom: 12,
      fontSize: 14,
    },
  });

const galleryStyles = {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};

export default galleryStyles;
