import { useMemo } from 'react';
import { ABOUT_TEXT } from '../../constants/texts/aboutTexts';

export function useAboutUs() {
  return useMemo(() => ABOUT_TEXT, []);
}

export default useAboutUs;

