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
      maxWidth: 540,
      width: '100%',
      alignSelf: 'center',
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 40,
    },
    // List screen
    heroSection: {
      marginBottom: 12,
    },
    heroTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: palette.text,
      textAlign: 'right',
    },
    heroSubtitle: {
      fontSize: 13,
      color: palette.subText,
      textAlign: 'right',
      lineHeight: 20,
      marginTop: 4,
    },
    filtersContainer: {
      flexDirection: 'row',
      marginBottom: 12,
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
      paddingBottom: 24,
      gap: 12,
    },
    loadingWrapper: {
      paddingVertical: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyWrapper: {
      paddingVertical: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      fontSize: 14,
      color: palette.subText,
      textAlign: 'center',
      lineHeight: 20,
    },
    errorText: {
      color: palette.danger,
      textAlign: 'center',
      fontSize: 14,
      marginVertical: 8,
    },
    card: {
      backgroundColor: palette.card,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 12,
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
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: palette.text,
      textAlign: 'right',
      flex: 1,
    },
    cardTypeBadge: {
      borderRadius: 999,
      paddingVertical: 3,
      paddingHorizontal: 10,
      backgroundColor: palette.light.secondary,
    },
    cardTypeText: {
      fontSize: 12,
      color: palette.text,
      fontWeight: '600',
    },
    cardMetaRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
      marginTop: 6,
    },
    cardMetaText: {
      fontSize: 12,
      color: palette.subText,
      textAlign: 'right',
    },
    // Detail screen
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.card,
      borderWidth: 1,
      borderColor: palette.border,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '700',
      color: palette.text,
      marginHorizontal: 12,
    },
    headerSpacer: {
      width: 38,
    },
    heroCard: {
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: palette.card,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 8,
      elevation: 4,
    },
    heroImage: {
      width: '100%',
      height: 240,
    },
    heroFallback: {
      height: 240,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.light.secondary,
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
      flexWrap: 'wrap',
    },
    heroMetaText: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.85)',
      textAlign: 'right',
    },
    infoSection: {
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: 14,
      borderWidth: 1,
      borderColor: palette.border,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      fontSize: 18,
      fontWeight: '700',
      color: palette.text,
      textAlign: 'right',
      marginBottom: 8,
    },
    bodyText: {
      fontSize: 14,
      color: palette.text,
      lineHeight: 22,
      textAlign: 'right',
    },
    programList: {},
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
    },
    programTitle: {
      fontSize: 14,
      color: palette.text,
    },
    equipmentChipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
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
      marginBottom: 12,
    },
    gallerySection: {
      marginTop: 12,
      marginBottom: 8,
    },
    galleryScroll: {
      paddingVertical: 6,
    },
    galleryImageWrapper: {
      marginLeft: 12,
      borderRadius: 14,
      overflow: 'hidden',
      backgroundColor: palette.card,
      borderWidth: 1,
      borderColor: palette.border,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    galleryImage: {
      width: 240,
      height: 150,
    },
  });

export default {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};
