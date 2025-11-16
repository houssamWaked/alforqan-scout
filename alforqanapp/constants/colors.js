// src/constants/colors.js
const LIGHT_COLORS = {
  primary: '#1B5E20', // deep scout green for premium feel
  secondary: '#FFC857', // warm soft gold accent
  background: '#F4F6F8', // slightly softer light background
  text: '#121212', // stronger contrast for readability
  subText: '#5F6368', // muted but readable
  border: '#E0E3E7', // subtle light gray for borders
  card: '#FFFFFF', // elevated card background
  danger: '#E53935',
  success: '#2E7D32',
  muted: '#B0BEC5',
  white: '#FFFFFF',
  light: {
    secondary: '#F2F4F7', // card-like secondary surfaces
  },
};

const DARK_COLORS = {
  primary: '#A5D06B', // brighter green on dark
  secondary: '#FFCA63',
  background: '#070B11',
  text: '#F9FAFB',
  subText: '#9CA3AF',
  border: '#111827',
  card: '#101827',
  danger: '#F97373',
  success: '#4ADE80',
  muted: '#6B7280',
  white: '#FFFFFF',
  light: {
    secondary: '#1F2937',
  },
};

export const COLOR_SCHEMES = {
  light: LIGHT_COLORS,
  dark: DARK_COLORS,
};

export const DEFAULT_COLOR_SCHEME = 'light';

export default LIGHT_COLORS;
