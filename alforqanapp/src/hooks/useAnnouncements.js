import { useEffect, useState } from 'react';
import { HOME_TEXT } from '../../constants/texts/homeTexts';
import { getPinnedAnnouncement } from '../services/announcementService';

export function useAnnouncements() {
  const [announcement, setAnnouncement] = useState(
    HOME_TEXT.fallbackAnnounce
  );

  useEffect(() => {
    let isMounted = true;

    const loadAnnouncement = async () => {
      try {
        const text = await getPinnedAnnouncement();
        if (isMounted && text) {
          setAnnouncement(text);
        }
      } catch (error) {
        // Log and keep showing the local fallback text.
        console.error('useAnnouncements error:', error);
      }
    };

    loadAnnouncement();

    return () => {
      isMounted = false;
    };
  }, []);

  return announcement;
}
