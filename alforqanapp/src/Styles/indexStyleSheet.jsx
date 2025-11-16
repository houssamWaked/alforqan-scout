import { StyleSheet } from 'react-native';
import { COLOR_SCHEMES } from '../../constants/colors';
import sizing from '../../constants/sizing';

const createStyles = (palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: sizing.spacing.lg,
      paddingVertical: sizing.spacing.xl,
    },
    contentBox: {
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 520,
      width: '100%',
    },
    logoCircle: {
      ...sizing.shadow.default,
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: palette.card,
      borderWidth: 4,
      borderColor: palette.secondary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: sizing.spacing.lg,
    },
    logo: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
    },

    title: {
      color: palette.text,
      marginBottom: sizing.spacing.sm,
    },
    subtitle: {
      color: palette.primary,
      marginBottom: sizing.spacing.sm,
    },
    description: {
      textAlign: 'center',
      color: palette.subText,
      lineHeight: 22,
      marginHorizontal: sizing.spacing.md,
      marginBottom: sizing.spacing.lg,
    },
    button: {
      ...sizing.shadow.default,
      alignSelf: 'stretch',
      marginTop: sizing.spacing.md,
    },
  });

const indexStyles = {
  light: createStyles(COLOR_SCHEMES.light),
  dark: createStyles(COLOR_SCHEMES.dark),
};

export default indexStyles;
