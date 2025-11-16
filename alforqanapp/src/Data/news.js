export const NEWS_ITEMS = [
  {
    id: 'news-1',
    title: 'إطلاق شارة خدمة المجتمع الجديدة',
    date: 'Nov 20',
    image: require('../../assets/images/competition.png'),
    images: [
      require('../../assets/images/competition.png'),
      require('../../assets/images/badges.png'),
    ],
    preview:
      'تم إضافة شارة جديدة لتنمية روح العمل التطوعي لدى الكشافين...',
    content:
      'تم إضافة شارة خدمة المجتمع الجديدة ضمن منظومة الشارات المعتمدة في الفرقة، بهدف تعزيز روح المبادرة والعطاء لدى الكشافين. يحصل الكشاف على الشارة بعد إكمال عدد من ساعات الخدمة التطوعية والمشاركة في مشاريع ميدانية تخدم المجتمع المحلي بشكل فعّال ومنظم.',
  },
  {
    id: 'news-2',
    title: 'ورشة تدريبية لقادة الوحدات حول القيادة الشابة',
    date: 'Nov 28',
    image: require('../../assets/images/badges.png'),
    images: [
      require('../../assets/images/badges.png'),
      require('../../assets/images/competition.png'),
    ],
    preview:
      'أقيمت ورشة تدريبية متخصصة لقادة الوحدات حول أساليب تمكين الشباب...',
    content:
      'أقيمت ورشة تدريبية جديدة لقادة الوحدات ركزت على مفهوم القيادة الشابة ودور القائد في اكتشاف طاقات الكشافين وتوجيههم بشكل إيجابي. تضمنت الورشة جلسات تفاعلية، وتمارين عملية، ونقاشات حول أفضل الممارسات في إدارة الفرق وتنمية مهارات الكشافين الشخصية والاجتماعية.',
  },
  {
    id: 'news-3',
    title: 'إطلاق حملة نظافة بيئية بمشاركة جميع الفرق',
    date: 'Dec 05',
    image: require('../../assets/images/partial-react-logo.png'),
    images: [
      require('../../assets/images/partial-react-logo.png'),
      require('../../assets/images/competition.png'),
    ],
    preview:
      'بدأت حملة بيئية شاملة لتنظيف الحدائق والشواطئ بمشاركة واسعة من الكشافين...',
    content:
      'أطلقت الفرقة الكشفية حملة واسعة للنظافة البيئية شملت عدداً من الحدائق والأماكن العامة، بمشاركة جميع الفرق والأقسام. تهدف الحملة إلى تعزيز قيم المحافظة على البيئة لدى الكشافين ونشر ثقافة المسؤولية المجتمعية، إضافة إلى تقديم صورة إيجابية عن دور الحركة الكشفية في خدمة المجتمع.',
  },
];

export function getNewsById(id) {
  if (!id) return undefined;
  const targetId = String(id);
  return NEWS_ITEMS.find((item) => String(item.id) === targetId);
}

