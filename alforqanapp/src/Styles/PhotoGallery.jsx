// src/Styles/PhotoGallery.js
import { StyleSheet } from 'react-native';
import { COLOR_SCHEMES } from '../../constants/colors';

const createStyles = (palette) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.background,
    },

    scroll: { flex: 1 },

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
      paddingVertical: 6,
      paddingHorizontal: 2,
      gap: 8,
      marginBottom: 12,
    },

    filterChip: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.card,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },

    filterChipActive: {
      backgroundColor: palette.primary,
      borderColor: palette.primary,
      shadowOpacity: 0.12,
      elevation: 4,
    },

    filterText: {
      fontSize: 13,
      color: palette.subText,
    },

    filterTextActive: {
      color: palette.white,
      fontWeight: '700',
    },

    featuredCard: {
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: palette.card,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 12,
      elevation: 6,
      marginBottom: 16,
    },

    featuredImage: {
      width: '100%',
      height: 230,
    },

    featuredOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      padding: 16,
      backgroundColor: 'rgba(0,0,0,0.25)',
    },

    featuredCaption: {
      color: palette.white,
      fontSize: 14,
      lineHeight: 20,
      textAlign: 'right',
    },
    featuredCategory: {
      alignSelf: 'flex-end',
      marginBottom: 8,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: 'rgba(255,255,255,0.2)',
      color: palette.white,
      fontSize: 12,
      fontWeight: '700',
      textAlign: 'center',
    },

    masonryRow: {
      flexDirection: 'row',
      gap: 12,
    },

    masonryColumn: {
      flex: 1,
      gap: 12,
    },

    imageCard: {
      backgroundColor: palette.card,
      borderRadius: 18,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 4,
    },

    imageCardPressed: {
      transform: [{ scale: 0.98 }],
    },
    imageCategoryBadge: {
      position: 'absolute',
      right: 10,
      bottom: 10,
      borderRadius: 999,
      backgroundColor: 'rgba(0,0,0,0.62)',
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    imageCategoryText: {
      color: palette.white,
      fontSize: 11,
      fontWeight: '700',
      textAlign: 'center',
    },

    image: {
      width: '100%',
      height: 180,
    },

    imageTall: {
      height: 240,
    },

    loadingWrapper: {
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
    modalCategory: {
      textAlign: 'center',
      color: palette.primary,
      fontSize: 13,
      fontWeight: '700',
      marginBottom: 6,
    },
  });

export default {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};
