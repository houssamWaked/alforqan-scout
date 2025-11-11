import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import sizing from '../../constants/sizing';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: sizing.spacing.lg,
  },
  contentBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    ...sizing.shadow.default,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.card,
    borderWidth: 4,
    borderColor: colors.secondary,
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
    color: colors.text,
    marginBottom: sizing.spacing.sm,
  },
  subtitle: {
    color: colors.primary,
    marginBottom: sizing.spacing.sm,
  },
  description: {
    textAlign: 'center',
    color: colors.subText,
    lineHeight: 22,
    marginHorizontal: sizing.spacing.md,
    marginBottom: sizing.spacing.lg,
  },
  button: {
    ...sizing.shadow.default,
    backgroundColor: colors.primary,
    paddingVertical: sizing.spacing.sm,
    paddingHorizontal: sizing.spacing.lg,
    borderRadius: sizing.radius.md,
    marginTop: sizing.spacing.sm,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
