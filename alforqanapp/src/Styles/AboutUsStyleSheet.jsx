import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import sizing from '../../constants/sizing';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: sizing.spacing.md,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
    color: colors.primary,
    marginBottom: sizing.spacing.md,
  },
  filterRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: sizing.spacing.md,
  },
  filterButton: {
    backgroundColor: colors.card,
    borderRadius: sizing.radius.md,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginLeft: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.text,
    fontSize: 14,
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: sizing.radius.md,
    marginBottom: sizing.spacing.md,
    padding: sizing.spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 110,
    borderRadius: sizing.radius.sm,
    marginBottom: 8,
  },
  year: {
    fontSize: 13,
    color: colors.primary,
    textAlign: 'right',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'right',
    color: colors.text,
  },
  desc: {
    fontSize: 13,
    textAlign: 'right',
    color: colors.subText,
  },
});
