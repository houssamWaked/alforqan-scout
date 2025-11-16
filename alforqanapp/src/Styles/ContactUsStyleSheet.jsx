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

    pageTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: palette.text,
      marginBottom: sizing.spacing.sm,
      textAlign: 'right',
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
      marginBottom: sizing.spacing.lg,
    },

    formTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: palette.text,
      marginBottom: sizing.spacing.sm,
      textAlign: 'right',
    },

    fieldGroup: {
      marginBottom: sizing.spacing.md,
    },

    fieldLabel: {
      fontSize: 14,
      color: palette.text,
      marginBottom: 4,
      textAlign: 'right',
    },

    input: {
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: palette.text,
      backgroundColor: palette.card,
      textAlign: 'right',
    },

    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },

    submitButton: {
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
      backgroundColor: palette.primary,
      marginTop: sizing.spacing.sm,
    },

    submitButtonDisabled: {
      opacity: 0.7,
    },

    submitButtonText: {
      color: palette.white,
      fontWeight: '700',
      fontSize: 15,
    },

    statusText: {
      marginTop: 6,
      fontSize: 13,
      textAlign: 'right',
    },

    errorText: {
      color: palette.danger,
    },

    successText: {
      color: palette.success,
    },

    socialCard: {
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: sizing.spacing.md,
      borderWidth: 1,
      borderColor: palette.border,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },

    socialTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: palette.text,
      marginBottom: sizing.spacing.sm,
      textAlign: 'right',
    },

    socialRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: sizing.spacing.xs,
    },

    socialIconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.light.secondary,
      marginRight: 8,
    },
  });

const contactStyles = {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};

export default contactStyles;

