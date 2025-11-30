// src/constants/colors.js

// -----------------------------------------------------
// LIGHT THEME - crisp sky palette
// -----------------------------------------------------
const LIGHT_COLORS = {
  primary: '#1B5E8F', // steel blue
  secondary: '#F28F3B', // warm amber accent
  background: '#F4F5FA', // cool off-white canvas
  text: '#0D1220', // deep ink
  subText: '#5B6272', // muted charcoal
  border: '#E1E4EE', // soft cool border
  card: '#FFFFFF', // clean white card
  danger: '#D64550',
  success: '#2F9B62',
  muted: '#A5AFC0',
  white: '#FFFFFF',
  light: {
    secondary: '#EBEDF5', // lifted surface
  },
};

// -----------------------------------------------------
// DARK THEME - crisp charcoal with glow
// -----------------------------------------------------
const DARK_COLORS = {
  primary: '#50D1A7', // glowing teal
  secondary: '#F9B461', // warm glow accent
  background: '#0C1016', // charcoal base
  text: '#F4F6FB', // soft white
  subText: '#9BA6B5', // cool gray
  border: '#1B222D', // subtle frame
  card: '#131A23', // raised panel
  danger: '#FF8A8A',
  success: '#67E8A6',
  muted: '#6F7A89',
  white: '#FFFFFF',
  light: {
    secondary: '#1F2A36', // softened surface
  },
};

// -----------------------------------------------------
// SCHEMES EXPORT
// -----------------------------------------------------
export const COLOR_SCHEMES = {
  light: LIGHT_COLORS,
  dark: DARK_COLORS,
};

export const DEFAULT_COLOR_SCHEME = 'light';

export default LIGHT_COLORS;
