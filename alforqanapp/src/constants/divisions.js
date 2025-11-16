export const DIVISIONS = {
  ashbal: {
    id: 'ashbal',
    name: 'الأشبال',
    icon: '🌱',
    heroImage:
      'https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?auto=format&fit=crop&w=1200&q=80',
    ageRange: 'من 7 إلى 11 سنة',
    description:
      'مرحلة مليئة باللعب والاكتشاف، يتعلم فيها الأشبال قيم التعاون والانتماء وحب الطبيعة من خلال أنشطة بسيطة وممتعة.',
    mission:
      'تنمية شخصية الأشبال بشكل متوازن، وتعويدهم على العمل الجماعي، والانضباط، وخدمة الآخرين.',
    skills: [
      'الاعتماد على النفس',
      'العمل ضمن فريق صغير',
      'الانضباط واحترام القوانين',
      'الأنشطة الكشفية الأساسية',
    ],

    leaders: [
      {
        id: 'ashbal-leader',
        name: 'قائد الأشبال',
        role: 'قائد الوحدة',
        badge: '🎖️',
        avatar:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'ashbal-assistant',
        name: 'نائب القائد',
        role: 'نائب القائد',
        badge: '⭐',
        avatar:
          'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
      },
    ],

    members: [
      {
        id: 'ashbal-m1',
        name: 'خليل محمود',
        role: 'عضو',
        badge: '🌟',
        avatar:
          'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'ashbal-m2',
        name: 'يوسف علي',
        role: 'عضو',
        badge: '🌟',
        avatar:
          'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'ashbal-m3',
        name: 'إبراهيم حسن',
        role: 'عضو',
        badge: '🌟',
        avatar:
          'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'ashbal-m4',
        name: 'سعيد يونس',
        role: 'عضو',
        badge: '🌟',
        avatar:
          'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'ashbal-m5',
        name: 'أدهم خليل',
        role: 'عضو',
        badge: '🌟',
        avatar:
          'https://images.unsplash.com/photo-1506898665065-93a9ba8e6b0b?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'ashbal-m6',
        name: 'سامر سليم',
        role: 'عضو',
        badge: '🌟',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'ashbal-m7',
        name: 'مالك أحمد',
        role: 'عضو',
        badge: '🌟',
        avatar:
          'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'ashbal-m8',
        name: 'يحيى منصور',
        role: 'عضو',
        badge: '🌟',
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'ashbal-m9',
        name: 'مازن خالد',
        role: 'عضو',
        badge: '🌟',
        avatar:
          'https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'ashbal-m10',
        name: 'نور حسام',
        role: 'عضو',
        badge: '🌟',
        avatar:
          'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80',
      },
    ],

    activities: [
      {
        id: 'camp-games',
        icon: 'ios-game-controller-outline',
        title: 'ألعاب كشفية',
        description: 'ألعاب حركية وتعاونية تقوّي روح الفريق والانتباه.',
      },
      {
        id: 'nature-walk',
        icon: 'leaf-outline',
        title: 'جولة في الطبيعة',
        description: 'استكشاف البيئة المحيطة والتعرّف على الأشجار والنباتات.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */

  scouts: {
    id: 'scouts',
    name: 'الكشافة',
    icon: '🔥',
    heroImage:
      'https://images.unsplash.com/photo-1523419409543-3e4f83b9b4c9?auto=format&fit=crop&w=1200&q=80',
    ageRange: 'من 12 إلى 17 سنة',
    description:
      'مرحلة النشاط والحركة وبناء المهارات القيادية، يعيش فيها الكشاف تجارب المخيمات، الخدمة العامة، والتحديات الكشفية.',
    mission:
      'إعداد جيل قيادي منضبط، قادر على تحمل المسؤولية وخدمة مجتمعه بروح الكشفية.',

    skills: [
      'القيادة والعمل الجماعي',
      'إدارة المخيمات والرحلات',
      'التخطيط للمشاريع الكشفية',
      'التواصل الفعال',
    ],

    leaders: [
      {
        id: 'scout-leader',
        name: 'قائد الكشافة',
        role: 'قائد الوحدة',
        badge: '🎖️',
        avatar:
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'scout-patrol',
        name: 'عريف الطليعة',
        role: 'قائد طليعة',
        badge: '⭐',
        avatar:
          'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
      },
    ],

    members: [
      {
        id: 'scout-m1',
        name: 'جورج سمير',
        role: 'كشاف',
        badge: '🔥',
        avatar:
          'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'scout-m2',
        name: 'محمد تقي',
        role: 'كشاف',
        badge: '🔥',
        avatar:
          'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'scout-m3',
        name: 'رامي جهاد',
        role: 'كشاف',
        badge: '🔥',
        avatar:
          'https://images.unsplash.com/photo-1603415526960-f8f0a1b63d5f?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'scout-m4',
        name: 'حسين العلي',
        role: 'كشاف',
        badge: '🔥',
        avatar:
          'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'scout-m5',
        name: 'جود إبراهيم',
        role: 'كشاف',
        badge: '🔥',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'scout-m6',
        name: 'كامل وهبة',
        role: 'كشاف',
        badge: '🔥',
        avatar:
          'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'scout-m7',
        name: 'فضل أيوب',
        role: 'كشاف',
        badge: '🔥',
        avatar:
          'https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'scout-m8',
        name: 'هادي رامي',
        role: 'كشاف',
        badge: '🔥',
        avatar:
          'https://images.unsplash.com/photo-1603415526960-f8f0a1b63d5f?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'scout-m9',
        name: 'أمين منصور',
        role: 'كشاف',
        badge: '🔥',
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'scout-m10',
        name: 'سامي زهران',
        role: 'كشاف',
        badge: '🔥',
        avatar:
          'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80',
      },
    ],

    activities: [
      {
        id: 'night-camp',
        icon: 'bonfire-outline',
        title: 'مخيم ليلي',
        description: 'نصب الخيام، إشعال النار، وبرنامج سمر كشفي مميز.',
      },
      {
        id: 'service-project',
        icon: 'hand-left-outline',
        title: 'مشروع خدمة عامة',
        description: 'مبادرات لخدمة المدرسة، الحي أو المجتمع المحلي.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */

  rovers: {
    id: 'rovers',
    name: 'الجوالة',
    icon: '🧭',
    heroImage:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    ageRange: '18 سنة فما فوق',
    description:
      'مرحلة العطاء والمسؤولية، يركز فيها الجوال على خدمة المجتمع، وتنمية الذات، والقيادة في الميدان.',
    mission:
      'تأهيل شباب قادر على قيادة المبادرات الكشفية والمجتمعية بروح المسؤولية والالتزام.',

    skills: [
      'قيادة الفرق والبرامج',
      'إدارة الوقت والمشاريع',
      'المبادرة والعمل التطوعي',
      'بناء العلاقات والشراكات',
    ],

    leaders: [
      {
        id: 'rover-leader',
        name: 'قائد الجوالة',
        role: 'قائد الوحدة',
        badge: '🎖️',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'rover-assistant',
        name: 'مساعد القائد',
        role: 'نائب القائد',
        badge: '⭐',
        avatar:
          'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=400&q=80',
      },
    ],

    members: [
      {
        id: 'rover-m1',
        name: 'خالد عماد',
        role: 'عضو',
        badge: '🧭',
        avatar:
          'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'rover-m2',
        name: 'زياد سامي',
        role: 'عضو',
        badge: '🧭',
        avatar:
          'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'rover-m3',
        name: 'فارس حسن',
        role: 'عضو',
        badge: '🧭',
        avatar:
          'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'rover-m4',
        name: 'ليث مراد',
        role: 'عضو',
        badge: '🧭',
        avatar:
          'https://images.unsplash.com/photo-1506898665065-93a9ba8e6b0b?auto=format&w=400&q=80',
      },
      {
        id: 'rover-m5',
        name: 'مصعب غسان',
        role: 'عضو',
        badge: '🧭',
        avatar:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&w=400&q=80',
      },
      {
        id: 'rover-m6',
        name: 'أنس شفيق',
        role: 'عضو',
        badge: '🧭',
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&w=400&q=80',
      },
      {
        id: 'rover-m7',
        name: 'عدنان ضاهر',
        role: 'عضو',
        badge: '🧭',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&w=400&q=80',
      },
      {
        id: 'rover-m8',
        name: 'يزن مصطفى',
        role: 'عضو',
        badge: '🧭',
        avatar:
          'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=400&q=80',
      },
      {
        id: 'rover-m9',
        name: 'معتصم سرور',
        role: 'عضو',
        badge: '🧭',
        avatar:
          'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&w=400&q=80',
      },
      {
        id: 'rover-m10',
        name: 'أكرم جواد',
        role: 'عضو',
        badge: '🧭',
        avatar:
          'https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&w=400&q=80',
      },
    ],

    activities: [
      {
        id: 'expedition',
        icon: 'trail-sign-outline',
        title: 'رحلة استكشافية',
        description: 'مسارات طويلة، تحديات ميدانية، وتعليم متقدم للملاحة.',
      },
      {
        id: 'community-service',
        icon: 'people-outline',
        title: 'خدمة مجتمعية',
        description: 'برامج تطوعية مع مؤسسات وجمعيات محلية.',
      },
    ],
  },
};

export function getDivisionById(id) {
  if (!id) return null;
  return DIVISIONS[id] ?? null;
}

export default DIVISIONS;

