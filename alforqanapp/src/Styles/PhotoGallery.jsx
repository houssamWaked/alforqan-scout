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
      maxWidth: 520,
      width: '100%',
      alignSelf: 'center',
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 40,
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

    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },

    modalContent: {
      maxWidth: 600,
      width: '100%',
      borderRadius: 20,
      backgroundColor: palette.card,
      padding: 12,
    },

    modalImage: {
      width: '100%',
      height: 320,
      borderRadius: 16,
      marginBottom: 8,
    },

    modalCaption: {
      textAlign: 'center',
      color: palette.text,
      fontSize: 14,
    },
  });

const galleryStyles = {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};

export default galleryStyles;
