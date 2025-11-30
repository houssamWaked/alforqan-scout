import { useTheme } from './useTheme';

export function useTypography() {
  const { typography } = useTheme();
  return typography;
}

export default useTypography;
