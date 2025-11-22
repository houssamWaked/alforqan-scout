// useThemedStyles.js
import { useTheme } from './useTheme';

export function useThemedStyles(styleSets) {
  const { scheme } = useTheme();
  return styleSets[scheme] ?? styleSets.light ?? styleSets.dark ?? {};
}
