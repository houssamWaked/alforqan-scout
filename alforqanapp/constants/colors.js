// src/constants/colors.js
const LIGHT_COLORS = {
  primary: '#2E7D32', // main scout green
  secondary: '#FFD54F', // soft gold accent
  background: '#F8F9FA', // clean light background
  text: '#212121', // default dark text
  subText: '#555', // secondary text
  border: '#E0E0E0', // light gray for borders
  card: '#FFFFFF', // default card background
  danger: '#E53935', // red for errors
  success: '#43A047', // green success accent
  muted: '#BDBDBD', // gray placeholders
  white: '#FFFFFF',
  light: {
    secondary: '#F3F3F3',
  },
};

const DARK_COLORS = {
  primary: '#8BC34A',
  secondary: '#FFC107',
  background: '#0F172A',
  text: '#F8FAFC',
  subText: '#CBD5F5',
  border: '#1F2937',
  card: '#1E293B',
  danger: '#EF4444',
  success: '#22C55E',
  muted: '#6B7280',
  white: '#FFFFFF',
  light: {
    secondary: '#1E293B',
  },
};

export const COLOR_SCHEMES = {
  light: LIGHT_COLORS,
  dark: DARK_COLORS,
};

export const DEFAULT_COLOR_SCHEME = 'light';

export default LIGHT_COLORS;
