// useTheme.js
import { useColorScheme } from 'react-native';
import { useContext } from 'react';
import { COLOR_SCHEMES, DEFAULT_COLOR_SCHEME } from '../../constants/colors';
import { ThemeContext } from '../context/ThemeContext';

export function useTheme() {
  const context = useContext(ThemeContext);
  const systemScheme = useColorScheme() ?? DEFAULT_COLOR_SCHEME;
  const scheme = context?.scheme ?? systemScheme;
  const colors = COLOR_SCHEMES[scheme] ?? COLOR_SCHEMES[DEFAULT_COLOR_SCHEME];
  return {
    colors,
    scheme,
    toggleScheme: context?.toggleScheme,
    resetScheme: context?.resetScheme,
  };
}
