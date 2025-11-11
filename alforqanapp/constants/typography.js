// src/constants/typography.js
import colors from './colors'; // optional if you want consistent text color

export default {
  fontFamily: {
    regular: 'System', // You can replace with custom font name later (e.g., "Cairo-Regular")
    bold: 'System', // Or "Cairo-Bold"
    light: 'System',
  },

  headings: {
    h1: {
      fontSize: 28,
      fontWeight: '700',
      color: colors?.text || '#212121',
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      color: colors?.text || '#212121',
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      color: colors?.text || '#212121',
    },
  },

  body: {
    regular: {
      fontSize: 16,
      fontWeight: '400',
      color: colors?.text || '#212121',
    },
    small: {
      fontSize: 14,
      fontWeight: '400',
      color: colors?.subText || '#555',
    },
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: colors?.muted || '#999',
  },
};
