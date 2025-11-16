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
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 40,
    },

    heroSection: {
      marginBottom: 16,
      alignItems: 'flex-end',
    },
    heroTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: palette.text,
      textAlign: 'right',
      marginBottom: 4,
    },
    heroSubtitle: {
      fontSize: 13,
      color: palette.subText,
      textAlign: 'right',
    },

    filtersContainer: {
      paddingVertical: 8,
      paddingHorizontal: 2,
      marginBottom: 8,
    },
    filtersRow: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
    },
    filterChip: {
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.border,
      marginLeft: 8,
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
      paddingBottom: 40,
    },

    card: {
      backgroundColor: palette.card,
      borderRadius: 16,
      marginBottom: 12,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 3,
    },
    cardImage: {
      width: '100%',
      height: 160,
    },
    cardContent: {
      padding: 12,
    },
    cardHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: palette.text,
      textAlign: 'right',
      flex: 1,
      marginLeft: 8,
    },
    cardTypeBadge: {
      borderRadius: 999,
      paddingVertical: 2,
      paddingHorizontal: 10,
      backgroundColor: palette.light.secondary,
    },
    cardTypeText: {
      fontSize: 12,
      color: palette.text,
    },
    cardMetaRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 4,
    },
    cardMetaText: {
      fontSize: 12,
      color: palette.subText,
      marginLeft: 8,
      textAlign: 'right',
    },
    emptyStateWrapper: {
      paddingVertical: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyStateText: {
      fontSize: 14,
      color: palette.subText,
      textAlign: 'center',
    },

    // Detail screen
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
    heroCard: {
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 16,
      backgroundColor: palette.card,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 3,
    },
    heroImage: {
      width: '100%',
      height: 220,
    },
    heroOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    heroTitleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: palette.white,
      textAlign: 'right',
      flex: 1,
      marginLeft: 12,
    },
    detailTypeBadge: {
      borderRadius: 999,
      paddingVertical: 3,
      paddingHorizontal: 12,
      backgroundColor: 'rgba(0,0,0,0.45)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.6)',
    },
    detailTypeText: {
      fontSize: 12,
      color: palette.white,
      fontWeight: '600',
    },
    heroMetaRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 6,
    },
    heroMetaText: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.85)',
      marginLeft: 8,
      textAlign: 'right',
    },

    infoSection: {
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: 14,
      borderWidth: 1,
      borderColor: palette.border,
      marginBottom: 16,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    infoLabel: {
      fontSize: 13,
      color: palette.subText,
      textAlign: 'right',
      marginLeft: 8,
    },
    infoValue: {
      fontSize: 14,
      color: palette.text,
      textAlign: 'right',
      flex: 1,
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: palette.text,
      marginBottom: 8,
      textAlign: 'right',
    },
    descriptionText: {
      fontSize: 14,
      color: palette.subText,
      lineHeight: 22,
      textAlign: 'right',
      marginBottom: 16,
    },

    newsHeroControls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    newsHeroArrow: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.card,
      borderWidth: 1,
      borderColor: palette.border,
      marginHorizontal: 8,
    },
    newsHeroArrowDisabled: {
      opacity: 0.4,
    },
    newsHeroCounter: {
      fontSize: 13,
      color: palette.subText,
    },

    programItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    programTimeColumn: {
      width: 64,
      alignItems: 'flex-end',
    },
    programTime: {
      fontSize: 12,
      color: palette.subText,
    },
    programContent: {
      flex: 1,
      paddingRight: 10,
    },
    programTitle: {
      fontSize: 14,
      color: palette.text,
    },
    programLine: {
      position: 'absolute',
      left: 0,
      top: sizing.spacing.xs,
      bottom: 0,
      width: 2,
      backgroundColor: palette.border,
    },

    equipmentChipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      marginBottom: 16,
    },
    equipmentChip: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
      backgroundColor: palette.light.secondary,
      marginLeft: 8,
      marginBottom: 8,
    },
    equipmentChipText: {
      fontSize: 13,
      color: palette.text,
    },

    ctaWrapper: {
      marginTop: 4,
      marginBottom: 24,
    },
  });

const eventsStyles = {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};

export default eventsStyles;
