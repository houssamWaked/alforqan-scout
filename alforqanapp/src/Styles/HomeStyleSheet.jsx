import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import sizing from '../../constants/sizing';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: sizing.spacing.md,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: sizing.spacing.lg,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: sizing.spacing.sm,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  motto: {
    fontSize: 14,
    color: colors.subText,
    textAlign: 'center',
    marginTop: 4,
  },

  // Feature Cards
  featureRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    marginBottom: sizing.spacing.lg,
  },
  footerText: {
    textAlign: 'center',
    color: colors.subText,
    marginTop: 20,
    marginBottom: 30,
    lineHeight: 20,
    fontSize: 13,
  },

  featureText: {
    fontSize: 13,
    marginTop: 4,
    color: colors.text,
  },

  // Achievements Preview
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: sizing.spacing.sm,
  },
  achievementCard: {
    backgroundColor: colors.card,
    borderRadius: sizing.radius.md,
    marginRight: sizing.spacing.sm,
    padding: sizing.spacing.sm,
    width: 180,
    borderWidth: 1,
    borderColor: colors.border,
  },
  achievementImg: {
    width: '100%',
    height: 100,
    borderRadius: sizing.radius.sm,
    marginBottom: 8,
  },
  achievementYear: {
    color: colors.primary,
    fontSize: 13,
  },
  achievementTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.text,
  },
  achievementDesc: {
    fontSize: 12,
    color: colors.subText,
  },

  // More button
  moreButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: sizing.radius.md,
    alignSelf: 'center',
    marginTop: sizing.spacing.sm,
    marginBottom: sizing.spacing.lg,
  },
  moreText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Quote
  quoteBox: {
    backgroundColor: colors.secondary + '22',
    padding: sizing.spacing.md,
    borderRadius: sizing.radius.lg,
  },
  quote: {
    textAlign: 'center',
    fontSize: 15,
    fontStyle: 'italic',
    color: colors.primary,
  },
});
