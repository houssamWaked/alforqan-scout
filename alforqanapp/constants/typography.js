// src/constants/typography.js
import { COLOR_SCHEMES, DEFAULT_COLOR_SCHEME } from './colors';

const baseFontFamily = {
  regular: 'System',
  bold: 'System',
  light: 'System',
};

export const createTypography = (palette) => ({
  fontFamily: baseFontFamily,

  display: {
    hero: {
      fontSize: 36,
      lineHeight: 44,
      fontWeight: '800',
      letterSpacing: -0.5,
      color: palette.text,
    },
  },

  headings: {
    h1: {
      fontSize: 30,
      fontWeight: '700',
      letterSpacing: -0.2,
      color: palette.text,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      letterSpacing: 0,
      color: palette.text,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      letterSpacing: 0.1,
      color: palette.text,
    },
  },

  body: {
    large: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 26,
      color: palette.text,
    },
    regular: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      color: palette.text,
    },
    small: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: palette.subText,
    },
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: palette.muted,
  },

  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: palette.primary,
  },
});

export const TYPOGRAPHY_SCHEMES = {
  light: createTypography(COLOR_SCHEMES.light),
  dark: createTypography(COLOR_SCHEMES.dark),
};

export const DEFAULT_TYPOGRAPHY_SCHEME = DEFAULT_COLOR_SCHEME;

const typography = TYPOGRAPHY_SCHEMES[DEFAULT_TYPOGRAPHY_SCHEME];

export default typography;
