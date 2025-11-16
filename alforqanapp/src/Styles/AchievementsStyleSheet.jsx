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

    detailHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    detailBackButton: {
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
    detailScreenTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: palette.text,
      textAlign: 'right',
      flex: 1,
    },
    detailHeroCard: {
      backgroundColor: palette.card,
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 3,
      position: 'relative',
    },
    detailImage: {
      width: '100%',
      height: 220,
    },
    detailMetaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    detailTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: palette.text,
      marginBottom: 8,
      textAlign: 'right',
    },
    detailDescription: {
      fontSize: 14,
      color: palette.subText,
      lineHeight: 22,
      textAlign: 'right',
    },

    detailCarouselTrack: {
      flexDirection: 'row',
    },
    detailImageWrapper: {
      height: 220,
      overflow: 'hidden',
    },
    detailImageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.15)',
    },
    detailImageFallback: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.light.secondary,
    },
    detailImageFallbackText: {
      marginTop: 6,
      fontSize: 13,
      color: palette.subText,
    },
    detailArrow: {
      position: 'absolute',
      top: '50%',
      marginTop: -16,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: palette.card,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    detailArrowLeft: {
      left: 8,
    },
    detailArrowRight: {
      right: 8,
    },

    detailGalleryTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: palette.text,
      marginTop: 16,
      marginBottom: 8,
      textAlign: 'right',
    },
    detailGalleryRow: {
      flexDirection: 'row',
      paddingBottom: 4,
    },
    detailThumb: {
      width: 100,
      height: 80,
      borderRadius: 12,
      marginLeft: 8,
      overflow: 'hidden',
      backgroundColor: palette.card,
    },
  });

const achievementStyles = {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};

export default achievementStyles;
