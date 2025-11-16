import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { DEFAULT_COLOR_SCHEME } from '../../constants/colors';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme() ?? DEFAULT_COLOR_SCHEME;
  const [manualScheme, setManualScheme] = useState(null);

  const scheme = manualScheme ?? systemScheme;

  const toggleScheme = useCallback(() => {
    setManualScheme((prev) => {
      const current = prev ?? systemScheme;
      const next = current === 'dark' ? 'light' : 'dark';
      return next;
    });
  }, [systemScheme]);

  const resetScheme = useCallback(() => {
    setManualScheme(null);
  }, []);

  const value = useMemo(
    () => ({
      scheme,
      toggleScheme,
      setScheme: setManualScheme,
      resetScheme,
    }),
    [scheme, toggleScheme, resetScheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
