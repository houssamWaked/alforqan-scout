// useTheme.js
import { useColorScheme } from 'react-native';
import { useContext, useMemo } from 'react';
import { COLOR_SCHEMES, DEFAULT_COLOR_SCHEME } from '../../constants/colors';
import {
  createTypography,
  DEFAULT_TYPOGRAPHY_SCHEME,
  TYPOGRAPHY_SCHEMES,
} from '../../constants/typography';
import { ThemeContext } from '../context/ThemeContext';

export function useTheme() {
  const context = useContext(ThemeContext);
  const systemScheme = useColorScheme() ?? DEFAULT_COLOR_SCHEME;
  const scheme = context?.scheme ?? systemScheme;
  const colors = COLOR_SCHEMES[scheme] ?? COLOR_SCHEMES[DEFAULT_COLOR_SCHEME];
  const typography = useMemo(() => {
    if (TYPOGRAPHY_SCHEMES[scheme]) return TYPOGRAPHY_SCHEMES[scheme];
    if (TYPOGRAPHY_SCHEMES[DEFAULT_TYPOGRAPHY_SCHEME])
      return TYPOGRAPHY_SCHEMES[DEFAULT_TYPOGRAPHY_SCHEME];
    return createTypography(colors);
  }, [colors, scheme]);
  return {
    colors,
    typography,
    scheme,
    toggleScheme: context?.toggleScheme,
    resetScheme: context?.resetScheme,
  };
}
