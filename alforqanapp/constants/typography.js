// src/constants/typography.js
import colors from './colors';

const baseFontFamily = {
  regular: 'System',
  bold: 'System',
  light: 'System',
};

export default {
  fontFamily: baseFontFamily,

  headings: {
    h1: {
      fontSize: 30,
      fontWeight: '700',
      letterSpacing: 0.4,
      color: colors.text,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      letterSpacing: 0.3,
      color: colors.text,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      letterSpacing: 0.2,
      color: colors.text,
    },
  },

  body: {
    regular: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 22,
      color: colors.text,
    },
    small: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: colors.subText,
    },
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.muted,
  },
};
