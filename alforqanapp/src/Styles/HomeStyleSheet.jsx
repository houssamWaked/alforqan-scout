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
      maxWidth: 480,
      width: '100%',
      alignSelf: 'center',
      padding: 16,
      paddingBottom: 40,
    },

    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      marginTop: 12,
    },

    sectionContainer: {
      marginBottom: 16,
    },

    line: {
      flex: 1,
      height: 1.2,
      backgroundColor: palette.border,
      marginHorizontal: 4,
      borderRadius: 10,
    },

    pinnedBox: {
      backgroundColor: '#E8F5E9',
      padding: 16,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 3,
      marginBottom: 16,
    },
    pinnedTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: palette.primary,
      marginBottom: 6,
      textAlign: 'right',
    },
    pinnedText: {
      color: palette.text,
      fontSize: 14,
      lineHeight: 22,
      textAlign: 'right',
    },

    eventCard: {
      width: 165,
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: 10,
      marginRight: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      elevation: 2,
    },

    eventImage: {
      width: '100%',
      height: 100,
      borderRadius: 12,
      marginBottom: 8,
    },

    eventTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: palette.text,
      marginBottom: 4,
      textAlign: 'right',
    },

    eventDate: {
      fontSize: 12,
      color: palette.subText,
      textAlign: 'right',
    },

    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 14,
    },

    actionButton: {
      flex: 1,
      backgroundColor: palette.card,
      borderRadius: 16,
      paddingVertical: 18,
      marginHorizontal: 6,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      elevation: 2,
    },

    actionIcon: {
      width: 40,
      height: 40,
      marginBottom: 6,
      resizeMode: 'contain',
    },

    actionText: {
      fontSize: 13,
      fontWeight: '600',
      color: palette.text,
    },
    header: {
      alignItems: 'center',
      marginBottom: 18,
    },
    themeToggle: {
      alignSelf: 'flex-end',
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.card,
      marginBottom: sizing.spacing.md,
    },
    themeToggleText: {
      color: palette.text,
      fontWeight: '600',
    },
    logo: {
      width: 90,
      height: 90,
      marginBottom: 12,
      resizeMode: 'contain',
    },
    greeting: {
      fontSize: 20,
      fontWeight: '600',
      color: palette.text,
      textAlign: 'right',
      marginBottom: 6,
    },
    motto: {
      fontSize: 14,
      color: palette.subText,
      textAlign: 'right',
      marginBottom: 18,
      lineHeight: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: palette.text,
      marginBottom: 12,
      textAlign: 'right',
    },
    achievementCard: {
      width: 220,
      backgroundColor: palette.card,
      borderRadius: 18,
      padding: 12,
      marginRight: 12,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 4,
    },
    achievementImg: {
      width: '100%',
      height: 140,
      borderRadius: 14,
      marginBottom: 8,
    },
    achievementYear: {
      color: palette.subText,
      fontSize: 12,
      marginBottom: 4,
    },
    achievementTitle: {
      color: palette.text,
      fontSize: 15,
      fontWeight: '600',
    },
    moreButton: {
      backgroundColor: palette.primary,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignSelf: 'center',
      marginTop: 16,
      ...{
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 4,
      },
    },
    moreText: {
      color: palette.white,
      fontWeight: '600',
      fontSize: 14,
    },
    quoteBox: {
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: 16,
      marginTop: 20,
      borderWidth: 1,
      borderColor: palette.border,
    },
    quote: {
      color: palette.subText,
      fontStyle: 'italic',
      lineHeight: 22,
      textAlign: 'center',
    },
    footerText: {
      color: palette.subText,
      fontSize: 12,
      textAlign: 'center',
      marginTop: 18,
      lineHeight: 18,
    },
  });

const homeStyles = {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};

export default homeStyles;
