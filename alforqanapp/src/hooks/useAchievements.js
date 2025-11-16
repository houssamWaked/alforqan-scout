// hooks/useAchievements.js
import { useMemo, useState } from 'react';
import { ACHIEVEMENT_FILTERS } from '../../constants/texts/achievementTexts';

// بيانات تجريبية بسيطة الآن؛ لاحقًا يمكن استبدالها ببيانات من API.
const MOCK_ACHIEVEMENTS = [
  {
    id: 1,
    title: 'مخيم الصيف 2023',
    type: 'camp',
    year: 2023,
    badge: '🏕️',
    description: 'مخيم نهاية الصيف يتضمّن مسير وألعاب جماعية.',
    image:
      'https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?q=80&w=800',
  },
  {
    id: 2,
    title: 'مسابقة المنطقة 2024',
    type: 'competition',
    year: 2024,
    badge: '🏅',
    description: 'شاركت الفرقة في تحدّي المنطقة وقدّمت أداء مميّز.',
    image:
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=800',
  },
  {
    id: 3,
    title: 'مشروع خدمة المجتمع',
    type: 'service',
    year: 2024,
    badge: '🤝',
    description: 'يوم تطوّعي لدعم الحيّ المحلي والنشاطات المجتمعية.',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
  },
];

export function useAchievements() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredAchievements = useMemo(() => {
    if (activeFilter === 'all') return MOCK_ACHIEVEMENTS;
    return MOCK_ACHIEVEMENTS.filter((a) => a.type === activeFilter);
  }, [activeFilter]);

  return {
    achievements: MOCK_ACHIEVEMENTS,
    filteredAchievements,
    activeFilter,
    setActiveFilter,
    filters: ACHIEVEMENT_FILTERS,
  };
}

export default useAchievements;
