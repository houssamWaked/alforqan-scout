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
      width: '100%',
      maxWidth: 540,
      alignSelf: 'center',
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 32,
      gap: 16,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    headerSpacer: {
      width: 36,
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
      marginHorizontal: 8,
    },
    heroCard: {
      borderRadius: 18,
      overflow: 'hidden',
      backgroundColor: palette.card,
      borderWidth: 1,
      borderColor: palette.border,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 4,
    },
    heroImage: {
      width: '100%',
      height: 240,
    },
    heroOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    heroTitle: {
      color: palette.white,
      fontSize: 18,
      fontWeight: '700',
    },
    heroMetaRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 6,
    },
    heroMetaText: {
      color: palette.white,
      opacity: 0.9,
      fontSize: 13,
    },
    heroControls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      gap: 12,
    },
    heroControlButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
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
    heroControlDisabled: {
      opacity: 0.4,
    },
    heroCounter: {
      color: palette.text,
      fontWeight: '600',
      fontSize: 13,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: palette.text,
    },
    bodyText: {
      color: palette.text,
      fontSize: 15,
      lineHeight: 22,
      textAlign: 'left',
    },
    errorText: {
      color: palette.danger,
      textAlign: 'center',
      fontSize: 14,
    },
    loadingWrapper: {
      paddingVertical: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyWrapper: {
      paddingVertical: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      color: palette.subText,
      textAlign: 'center',
      fontSize: 14,
      lineHeight: 20,
    },
  });

export default {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};
