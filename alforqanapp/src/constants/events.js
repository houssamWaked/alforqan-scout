// src/constants/events.js
export const EVENTS = [
  {
    id: 1,
    title: 'مخيم الشتاء – أبوظبي',
    type: 'camp',
    date: '2025-12-20',
    time: '08:00',
    location: 'مخيم الكشافة – الباهية',
    leader: 'القائد أحمد',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80',
    description:
      'مخيم شتوي لمدة ثلاثة أيام يركز على مهارات الخلاء والعمل الجماعي والنمو الروحي لجميع الوحدات الكشفية.',
    equipment: [
      'كيس نوم',
      'الزي الكشفي الكامل',
      'عبوة ماء',
      'مصباح يدوي',
      'دفتر وقلم',
    ],
    program: [
      { time: '08:00', title: 'الاستقبال والتسجيل' },
      { time: '10:00', title: 'الافتتاح وتحية العلم' },
      { time: '14:00', title: 'أنشطة السدود وورش العمل' },
      { time: '20:00', title: 'جلسة السمر والتأملات' },
    ],
  },

  {
    id: 2,
    title: 'يوم خدمة المدينة',
    type: 'service',
    date: '2025-11-25',
    time: '09:30',
    location: 'كورنيش أبوظبي',
    leader: 'القائدة فاطمة',
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80',
    description:
      'يوم كامل لخدمة المجتمع يشارك فيه الكشافون في تنظيف المرافق والأماكن العامة وخدمة المجتمع المحلي.',
    equipment: ['حذاء مريح', 'قبعة وواقي شمس', 'قفازات قابلة لإعادة الاستخدام'],
    program: [
      { time: '09:30', title: 'التجمع والتوجيه' },
      { time: '10:00', title: 'توزيع مجموعات الخدمة' },
      { time: '13:00', title: 'استراحة الغداء والصلاة' },
      { time: '15:30', title: 'جلسة ختام وتقييم' },
    ],
  },

  {
    id: 3,
    title: 'مسابقة الرماية بالقوس',
    type: 'competition',
    date: '2025-12-05',
    time: '16:00',
    location: 'ميدان التدريب الكشفي',
    leader: 'المدرب عمر',
    image: 'https://images.unsplash.com/photo-1520975918318-3ca8a6d6b53f?q=80',
    description:
      'مسابقة ودية للرماية بين الوحدات تركز على السلامة والدقة والروح الرياضية.',
    equipment: ['الزي الكشفي الكامل', 'عبوة ماء'],
    program: [
      { time: '16:00', title: 'شرح تعليمات السلامة' },
      { time: '16:30', title: 'جولة تدريبية' },
      { time: '17:00', title: 'الجولات التنافسية' },
      { time: '18:30', title: 'توزيع الجوائز والختام' },
    ],
  },

  {
    id: 4,
    title: 'ورشة تدريب القادة',
    type: 'training',
    date: '2025-11-30',
    time: '18:30',
    location: 'مقر الفرقان',
    leader: 'المفوض العام',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80',
    description:
      'ورشة مسائية لقادة الوحدات حول التخطيط، السلامة، وتقديم برامج كشفية مميزة.',
    equipment: ['دفتر وقلم', 'وشاح القائد', 'حاسوب محمول (اختياري)'],
    program: [
      { time: '18:30', title: 'ترحيب وتعريف المشاركين' },
      { time: '19:00', title: 'أفضل ممارسات تخطيط البرامج' },
      { time: '20:00', title: 'تقييم المخاطر والسلامة' },
      { time: '21:00', title: 'مشاركة الخبرات والختام' },
    ],
  },

  {
    id: 5,
    title: 'نزهة عائلية وألعاب',
    type: 'camp',
    date: '2025-10-10',
    time: '15:00',
    location: 'الحديقة العامة',
    leader: 'لجنة الأهالي',
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80',
    description:
      'نزهة عائلية ممتعة تتضمن ألعاباً جماعية وأنشطة ترفيهية وعرضاً كشفياً قصيراً.',
    equipment: ['بساط للجلوس', 'وجبات خفيفة للمشاركة', 'عبوة ماء'],
    program: [
      { time: '15:00', title: 'وصول وحركة حرة' },
      { time: '16:00', title: 'ألعاب عائلية' },
      { time: '17:30', title: 'عرض كشفي' },
      { time: '18:30', title: 'ختام وتنظيف المكان' },
    ],
  },
];

// Labels for filters
export function getEventTypeLabel(type) {
  switch (type) {
    case 'camp':
      return 'المخيمات';
    case 'competition':
      return 'المسابقات';
    case 'service':
      return 'الخدمة';
    case 'training':
      return 'التدريب';
    default:
      return 'فعاليات أخرى';
  }
}

// Check if the event is upcoming
export function isUpcomingEvent(dateString) {
  if (!dateString) return false;
  const today = new Date();
  const eventDate = new Date(dateString);
  if (Number.isNaN(eventDate.getTime())) return false;

  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const eventMidnight = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate()
  );

  return eventMidnight >= todayMidnight;
}

// Retrieve event by ID
export function getEventById(id) {
  if (!id) return undefined;
  const targetId = String(id);
  return EVENTS.find((event) => String(event.id) === targetId);
}
