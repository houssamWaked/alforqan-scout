import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import adminStyles from '../src/Styles/AdminDashboardStyleSheet';
import { useThemedStyles } from '../src/hooks/useThemedStyles';
import { useTheme } from '../src/hooks/useTheme';
import PrimaryButton from '../src/components/PrimaryButton';
import {
  deleteAdminRow,
  listAdminRows,
  saveAdminRow,
} from '../src/services/adminService';
import {
  deleteDivisionMember,
  listDivisionMembers,
  saveDivisionMember,
} from '../src/services/adminDivisionService';
import { pickAndUploadImages } from '../src/services/adminImageService';
import {
  ACHIEVEMENT_FILTER_TYPE,
  ACHIEVEMENT_TYPES,
  normalizeAchievementType,
} from '../src/constants/achievementTypes';

function buildDatasetMap(factory) {
  return {
    news: factory(),
    events: factory(),
    achievements: factory(),
    gallery: factory(),
    divisionMembers: factory(),
  };
}

function normalizeListValue(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      // Fall through to line and comma splitting.
    }

    return trimmed
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function serializeListValue(value) {
  return normalizeListValue(value).join('\n');
}

function toNullableText(value) {
  const normalized = String(value ?? '').trim();
  return normalized.length ? normalized : null;
}

function formatSyncTime(value) {
  if (!value) return 'لم يتم التحديث بعد';

  try {
    return new Date(value).toLocaleString('ar-LB');
  } catch {
    return value;
  }
}

function getOptionLabel(options, value, fallback) {
  const match = options.find((option) => option.value === value);
  return match?.label || fallback;
}

function removeImageAt(value, indexToRemove) {
  return normalizeListValue(value)
    .filter((_, index) => index !== indexToRemove)
    .join('\n');
}

const EVENT_TYPE_OPTIONS = [
  { label: '\u0645\u0639\u0633\u0643\u0631', value: 'camp' },
  { label: '\u0645\u0633\u0627\u0628\u0642\u0629', value: 'competition' },
  { label: '\u062e\u062f\u0645\u0629', value: 'service' },
  { label: '\u062a\u062f\u0631\u064a\u0628', value: 'training' },
];

const ACHIEVEMENT_TYPE_OPTIONS = [
  { label: '\u0627\u0644\u0643\u0644', value: 'all' },
  { label: '\u0645\u0639\u0633\u0643\u0631', value: 'camp' },
  { label: '\u0645\u0633\u0627\u0628\u0642\u0629', value: 'competition' },
  { label: '\u062e\u062f\u0645\u0629', value: 'service' },
];

const ADMIN_ACHIEVEMENT_TYPE_OPTIONS = ACHIEVEMENT_TYPE_OPTIONS.filter(
  (option) => option.value !== ACHIEVEMENT_FILTER_TYPE
);

const DATASET_DEFINITIONS = [
  {
    key: 'news',
    label: 'الأخبار',
    table: 'announcements',
    orderBy: 'published_at',
    description: 'إعلانات الصفحة الرئيسية ومنشورات الأخبار.',
    emptyLabel: 'لا توجد أخبار في قاعدة البيانات حالياً.',
    fields: [
      {
        key: 'title',
        label: 'العنوان',
        placeholder: 'تحديث نشاط شهر رمضان',
      },
      {
        key: 'message',
        label: 'المحتوى',
        placeholder: 'اكتب نص الإعلان الكامل هنا...',
        type: 'multiline',
      },
      {
        key: 'published_at',
        label: 'تاريخ النشر',
        placeholder: '2026-03-02T12:00:00Z',
        helper: 'استخدم تاريخاً بصيغة ISO حتى يبقى الترتيب صحيحاً.',
      },
      {
        key: 'image_url',
        label: 'الصورة الرئيسية',
        type: 'image',
      },
      {
        key: 'images',
        label: 'صور إضافية',
        type: 'image-list',
        helper: 'صور اختيارية تظهر في صفحة تفاصيل الخبر.',
      },
      {
        key: 'pinned',
        label: 'تثبيت الإعلان',
        type: 'boolean',
        description: 'الإعلانات المثبتة تظهر في بطاقة الإعلان أعلى الصفحة الرئيسية.',
      },
    ],
    createEmpty: () => ({
      title: '',
      message: '',
      published_at: new Date().toISOString(),
      image_url: '',
      images: '',
      pinned: false,
    }),
    deserialize: (row) => ({
      title: row?.title ?? '',
      message: row?.message ?? '',
      published_at: row?.published_at ?? new Date().toISOString(),
      image_url: row?.image_url ?? row?.image ?? '',
      images: serializeListValue(row?.images),
      pinned: !!row?.pinned,
    }),
    serialize: (formState) => ({
      title: formState.title.trim(),
      message: formState.message.trim(),
      published_at:
        formState.published_at.trim() || new Date().toISOString(),
      image_url: toNullableText(formState.image_url),
      images: normalizeListValue(formState.images),
      pinned: !!formState.pinned,
    }),
    validate: (formState) => {
      if (!formState.title.trim()) return 'العنوان مطلوب.';
      if (!formState.message.trim()) return 'المحتوى مطلوب.';
      return null;
    },
    getTitle: (row) => row?.title || 'خبر بدون عنوان',
    getMeta: (row) => {
      const status = row?.pinned ? 'مثبت' : 'عادي';
      const publishedAt = row?.published_at
        ? formatSyncTime(row.published_at)
        : 'بدون تاريخ نشر';
      return `${status} | ${publishedAt}`;
    },
  },
  {
    key: 'events',
    label: 'الأنشطة',
    table: 'events',
    orderBy: 'event_date',
    ascending: true,
    description: 'الأنشطة والمعسكرات والمسابقات والتسجيلات المرتبطة بها.',
    emptyLabel: 'لا توجد أنشطة في قاعدة البيانات حالياً.',
    fields: [
      {
        key: 'title',
        label: 'العنوان',
        placeholder: 'معسكر خارجي نهاية الأسبوع',
      },
      {
        key: 'description',
        label: 'الوصف',
        placeholder: 'اشرح برنامج النشاط وهدفه...',
        type: 'multiline',
      },
      {
        key: 'type',
        label: 'نوع النشاط',
        type: 'choice',
        options: EVENT_TYPE_OPTIONS.filter((option) => option?.value),
      },
      {
        key: 'event_date',
        label: 'تاريخ النشاط',
        placeholder: '2026-03-14',
        helper: 'استخدم الصيغة YYYY-MM-DD.',
      },
      {
        key: 'time',
        label: 'الوقت',
        placeholder: '09:00 صباحاً',
      },
      {
        key: 'location',
        label: 'الموقع',
        placeholder: 'المركز الكشفي',
      },
      {
        key: 'leader',
        label: 'المسؤول',
        placeholder: 'القائد أحمد',
      },
      {
        key: 'image_url',
        label: 'الصورة الرئيسية',
        type: 'image',
      },
      {
        key: 'images',
        label: 'صور إضافية',
        type: 'image-list',
      },
      {
        key: 'program',
        label: 'برنامج النشاط',
        placeholder: 'الوصول\nالافتتاح\nورشة عمل',
        type: 'multiline',
      },
      {
        key: 'equipment',
        label: 'المستلزمات المطلوبة',
        placeholder: 'قنينة ماء\nدفتر ملاحظات',
        type: 'multiline',
      },
    ],
    createEmpty: () => ({
      title: '',
      description: '',
      type: 'camp',
      event_date: new Date().toISOString().slice(0, 10),
      time: '',
      location: '',
      leader: '',
      image_url: '',
      images: '',
      program: '',
      equipment: '',
    }),
    deserialize: (row) => ({
      title: row?.title ?? row?.name ?? '',
      description: row?.description ?? row?.details ?? '',
      type: row?.type ?? 'camp',
      event_date: row?.event_date ?? row?.date ?? '',
      time: row?.time ?? row?.event_time ?? '',
      location: row?.location ?? row?.place ?? '',
      leader: row?.leader ?? row?.responsible ?? '',
      image_url: row?.image_url ?? row?.image ?? '',
      images: serializeListValue(
        row?.images ?? row?.images_url ?? row?.image_urls
      ),
      program: serializeListValue(row?.program),
      equipment: serializeListValue(row?.equipment),
    }),
    serialize: (formState) => ({
      title: formState.title.trim(),
      description: formState.description.trim(),
      type: formState.type,
      event_date: formState.event_date.trim(),
      time: toNullableText(formState.time),
      location: toNullableText(formState.location),
      leader: toNullableText(formState.leader),
      image_url: toNullableText(formState.image_url),
      images: normalizeListValue(formState.images),
      program: normalizeListValue(formState.program),
      equipment: normalizeListValue(formState.equipment),
    }),
    validate: (formState) => {
      if (!formState.title.trim()) return 'العنوان مطلوب.';
      if (!formState.event_date.trim()) return 'تاريخ النشاط مطلوب.';
      return null;
    },
    getTitle: (row) => row?.title || row?.name || 'نشاط بدون عنوان',
    getMeta: (row) =>
      `${getOptionLabel(EVENT_TYPE_OPTIONS, row?.type, 'نشاط')} | ${row?.event_date || row?.date || 'بدون تاريخ'}`,
  },
  {
    key: 'achievements',
    label: 'الإنجازات',
    table: 'achievements',
    orderBy: 'year',
    description: 'الجوائز والمحطات المهمة ونتائج المسابقات.',
    emptyLabel: 'لا توجد إنجازات في قاعدة البيانات حالياً.',
    fields: [
      {
        key: 'title',
        label: 'العنوان',
        placeholder: 'المركز الأول على مستوى المنطقة',
      },
      {
        key: 'description',
        label: 'الوصف',
        placeholder: 'اشرح الإنجاز ولماذا هو مهم...',
        type: 'multiline',
      },
      {
        key: 'badge',
        label: 'الشارة',
        placeholder: 'القيادة',
      },
      {
        key: 'year',
        label: 'السنة',
        placeholder: '2026',
        keyboardType: 'numeric',
      },
      {
        key: 'type',
        label: 'نوع الإنجاز',
        type: 'choice',
        options: ADMIN_ACHIEVEMENT_TYPE_OPTIONS,
      },
      {
        key: 'image_url',
        label: 'الصورة الرئيسية',
        type: 'image',
      },
      {
        key: 'images',
        label: 'صور إضافية',
        type: 'image-list',
      },
    ],
    createEmpty: () => ({
      title: '',
      description: '',
      badge: '',
      year: String(new Date().getFullYear()),
      type: ACHIEVEMENT_TYPES[0],
      image_url: '',
      images: '',
    }),
    deserialize: (row) => ({
      title: row?.title ?? row?.name ?? '',
      description: row?.description ?? row?.details ?? '',
      badge: row?.badge ?? row?.badge_name ?? '',
      year: String(row?.year ?? row?.date ?? ''),
      type: normalizeAchievementType(row?.type ?? row?.category),
      image_url: row?.image_url ?? row?.image ?? row?.imageUrl ?? '',
      images: serializeListValue(row?.images),
    }),
    serialize: (formState) => ({
      title: formState.title.trim(),
      description: formState.description.trim(),
      badge: toNullableText(formState.badge),
      year: toNullableText(formState.year),
      type: normalizeAchievementType(formState.type),
      image_url: toNullableText(formState.image_url),
      images: normalizeListValue(formState.images),
    }),
    validate: (formState) => {
      if (!formState.title.trim()) return 'العنوان مطلوب.';
      return null;
    },
    getTitle: (row) => row?.title || row?.name || 'إنجاز بدون عنوان',
    getMeta: (row) =>
      `${row?.badge || 'بدون شارة'} | ${row?.year || row?.date || 'بدون سنة'}`,
  },
  {
    key: 'gallery',
    label: 'المعرض',
    table: 'gallery_items',
    orderBy: 'year',
    description: 'صور المعرض المستخدمة في شاشة الصور.',
    emptyLabel: 'لا توجد صور في قاعدة البيانات حالياً.',
    fields: [
      {
        key: 'caption',
        label: 'التعليق',
        placeholder: 'افتتاح المعسكر السنوي',
      },
      {
        key: 'year',
        label: 'السنة',
        placeholder: '2026',
        keyboardType: 'numeric',
      },
      {
        key: 'image_url',
        label: 'الصورة',
        type: 'image',
      },
    ],
    createEmpty: () => ({
      caption: '',
      year: String(new Date().getFullYear()),
      image_url: '',
    }),
    deserialize: (row) => ({
      caption: row?.caption ?? '',
      year: String(row?.year ?? ''),
      image_url: row?.image_url ?? row?.image ?? row?.imageUrl ?? '',
    }),
    serialize: (formState) => ({
      caption: toNullableText(formState.caption),
      year: toNullableText(formState.year),
      image_url: toNullableText(formState.image_url),
    }),
    validate: (formState) => {
      if (!formState.image_url.trim()) return 'رابط الصورة مطلوب.';
      return null;
    },
    getTitle: (row) => row?.caption || 'صورة بدون عنوان',
    getMeta: (row) => `السنة | ${row?.year || 'غير معروفة'}`,
  },
  {
    key: 'divisionMembers',
    label: 'أعضاء الوحدات',
    description: 'إضافة القادة والأعضاء وربطهم بالوحدة المناسبة.',
    emptyLabel: 'لا توجد سجلات أعضاء للوحدات حالياً.',
    fields: [
      {
        key: 'division_id',
        label: 'الوحدة',
        type: 'choice',
        options: ({ divisionOptions }) => divisionOptions,
      },
      {
        key: 'full_name',
        label: 'اسم العضو',
        placeholder: 'محمد أحمد',
      },
      {
        key: 'role_name',
        label: 'اسم الدور',
        placeholder: 'قائد الوحدة أو عضو',
        helper: 'سيتم إنشاء الدور تلقائياً إذا لم يكن موجوداً.',
      },
      {
        key: 'is_lead',
        label: 'هذا الشخص قائد',
        type: 'boolean',
        description: 'عند تفعيلها سيظهر السجل ضمن قسم القادة في صفحة الوحدة.',
      },
      {
        key: 'joined_at',
        label: 'تاريخ الانضمام',
        placeholder: '2026-03-02',
        helper: 'استخدم الصيغة YYYY-MM-DD.',
      },
      {
        key: 'avatar_url',
        label: 'صورة العضو',
        type: 'image',
      },
    ],
    createEmpty: ({ divisionOptions }) => ({
      division_id: divisionOptions[0]?.value || '',
      full_name: '',
      role_name: '',
      is_lead: false,
      joined_at: new Date().toISOString().slice(0, 10),
      avatar_url: '',
    }),
    deserialize: (row) => ({
      division_id: row?.division_id ?? '',
      full_name: row?.full_name ?? '',
      role_name: row?.role_name ?? '',
      is_lead: !!row?.is_lead,
      joined_at: row?.joined_at ? String(row.joined_at).slice(0, 10) : '',
      avatar_url: row?.avatar_url ?? '',
    }),
    serialize: (formState) => ({
      division_id: formState.division_id,
      full_name: formState.full_name.trim(),
      role_name: formState.role_name.trim(),
      is_lead: !!formState.is_lead,
      joined_at: formState.joined_at.trim(),
      avatar_url: toNullableText(formState.avatar_url),
    }),
    validate: (formState) => {
      if (!formState.division_id) return 'الوحدة مطلوبة.';
      if (!formState.full_name.trim()) return 'اسم العضو مطلوب.';
      if (!formState.role_name.trim()) return 'اسم الدور مطلوب.';
      if (!formState.joined_at.trim()) return 'تاريخ الانضمام مطلوب.';
      return null;
    },
    getTitle: (row) => row?.full_name || 'عضو بدون اسم',
    getMeta: (row) =>
      `${row?.divisionName || 'بدون وحدة'} | ${row?.role_name || 'بدون دور'} | ${row?.is_lead ? 'قائد' : 'عضو'}`,
    list: listDivisionMembers,
    save: saveDivisionMember,
    remove: deleteDivisionMember,
  },
];

const DATASET_BY_KEY = Object.fromEntries(
  DATASET_DEFINITIONS.map((definition) => [definition.key, definition])
);

function SecondaryButton({ icon, iconColor, label, onPress, styles }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.secondaryButton,
        pressed && styles.secondaryButtonPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={16}
          color={iconColor}
        />
      ) : null}
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export default function AdminDashboardScreen() {
  const router = useRouter();
  const styles = useThemedStyles(adminStyles);
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const isMounted = useRef(true);

  const [activeDatasetKey, setActiveDatasetKey] = useState('news');
  const [rowsByDataset, setRowsByDataset] = useState(() =>
    buildDatasetMap(() => [])
  );
  const [loadingByDataset, setLoadingByDataset] = useState(() =>
    buildDatasetMap(() => false)
  );
  const [errorByDataset, setErrorByDataset] = useState(() =>
    buildDatasetMap(() => null)
  );
  const [lastSyncedByDataset, setLastSyncedByDataset] = useState(() =>
    buildDatasetMap(() => null)
  );
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState({});
  const [status, setStatus] = useState(null);
  const [busyAction, setBusyAction] = useState(null);
  const [deleteArmId, setDeleteArmId] = useState(null);
  const [uploadingFieldKey, setUploadingFieldKey] = useState(null);
  const [divisionOptions, setDivisionOptions] = useState([]);

  const activeDataset = DATASET_BY_KEY[activeDatasetKey];
  const activeRows = rowsByDataset[activeDatasetKey] || [];
  const activeError = errorByDataset[activeDatasetKey];
  const activeLoading = loadingByDataset[activeDatasetKey];
  const selectedRecord =
    activeRows.find((row) => String(row?.id) === String(editingId)) || null;
  const isWideLayout = width >= 980;
  const adminContext = useMemo(
    () => ({
      divisionOptions,
    }),
    [divisionOptions]
  );

  const resetEditor = useCallback((datasetKey) => {
    const definition = DATASET_BY_KEY[datasetKey];
    setEditingId(null);
    setFormState(definition.createEmpty(adminContext));
    setDeleteArmId(null);
  }, [adminContext]);

  const selectRecord = useCallback((datasetKey, row) => {
    const definition = DATASET_BY_KEY[datasetKey];
    setEditingId(row?.id ?? null);
    setFormState(definition.deserialize(row, adminContext));
    setDeleteArmId(null);
  }, [adminContext]);

  const loadDataset = useCallback(async (datasetKey) => {
    const definition = DATASET_BY_KEY[datasetKey];

    setLoadingByDataset((current) => ({
      ...current,
      [datasetKey]: true,
    }));
    setErrorByDataset((current) => ({
      ...current,
      [datasetKey]: null,
    }));

    const result = definition.list
      ? await definition.list()
      : await listAdminRows({
          table: definition.table,
          orderBy: definition.orderBy,
          ascending: !!definition.ascending,
        });

    const rows = result?.rows || [];
    const error = result?.error || null;

    if (!isMounted.current) {
      return [];
    }

    if (Array.isArray(result?.divisions)) {
      const nextOptions = result.divisions.map((division) => ({
        label: division.name,
        value: division.id,
      }));

      setDivisionOptions((current) => {
        const currentSerialized = JSON.stringify(current);
        const nextSerialized = JSON.stringify(nextOptions);
        return currentSerialized === nextSerialized ? current : nextOptions;
      });
    }

    setRowsByDataset((current) => ({
      ...current,
      [datasetKey]: rows,
    }));
    setLoadingByDataset((current) => ({
      ...current,
      [datasetKey]: false,
    }));
    setErrorByDataset((current) => ({
      ...current,
      [datasetKey]: error?.message || null,
    }));
    setLastSyncedByDataset((current) => ({
      ...current,
      [datasetKey]: error ? current[datasetKey] : new Date().toISOString(),
    }));

    return rows;
  }, []);

  useEffect(() => {
    isMounted.current = true;

    Promise.all(
      DATASET_DEFINITIONS.map((definition) => loadDataset(definition.key))
    ).catch(() => {});

    return () => {
      isMounted.current = false;
    };
  }, [loadDataset]);

  useEffect(() => {
    resetEditor(activeDatasetKey);
    setStatus(null);
  }, [activeDatasetKey, resetEditor]);

  useEffect(() => {
    if (
      activeDatasetKey === 'divisionMembers' &&
      !editingId &&
      !formState.division_id &&
      divisionOptions.length
    ) {
      setFormState((current) => ({
        ...current,
        division_id: divisionOptions[0].value,
      }));
    }
  }, [activeDatasetKey, divisionOptions, editingId, formState.division_id]);

  const handleFieldChange = useCallback((key, value) => {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }));
  }, []);

  const handleRefreshAll = useCallback(async () => {
    setStatus(null);
    await Promise.all(
      DATASET_DEFINITIONS.map((definition) => loadDataset(definition.key))
    );
  }, [loadDataset]);

  const handleImageUpload = useCallback(
    async (field, multiple = false) => {
      if (busyAction || uploadingFieldKey) return;

      try {
        setUploadingFieldKey(field.key);
        setStatus(null);

        const urls = await pickAndUploadImages({ multiple });

        if (!urls.length) {
          setUploadingFieldKey(null);
          return;
        }

        setFormState((current) => {
          if (multiple) {
            const existing = normalizeListValue(current[field.key]);
            return {
              ...current,
              [field.key]: [...existing, ...urls].join('\n'),
            };
          }

          return {
            ...current,
            [field.key]: urls[0] || '',
          };
        });

        setStatus({
          kind: 'success',
          message: multiple
            ? 'تم رفع الصور وإضافتها إلى السجل.'
            : 'تم رفع الصورة بنجاح.',
        });
      } catch (error) {
        setStatus({
          kind: 'error',
          message: error.message || 'تعذر رفع الصورة.',
        });
      } finally {
        if (isMounted.current) {
          setUploadingFieldKey(null);
        }
      }
    },
    [busyAction, uploadingFieldKey]
  );

  const handleSave = useCallback(async () => {
    if (busyAction) return;

    const validationMessage = activeDataset.validate(formState);

    if (validationMessage) {
      setStatus({ kind: 'error', message: validationMessage });
      return;
    }

    setBusyAction('save');
    setStatus(null);

    const { row, error } = activeDataset.save
      ? await activeDataset.save({
          id: editingId,
          values: activeDataset.serialize(formState, adminContext),
          context: adminContext,
        })
      : await saveAdminRow({
          table: activeDataset.table,
          id: editingId,
          values: activeDataset.serialize(formState, adminContext),
        });

    if (!isMounted.current) {
      return;
    }

    if (error) {
      setBusyAction(null);
      setStatus({
        kind: 'error',
        message: error.message || 'تعذر حفظ السجل.',
      });
      return;
    }

    const updatedRows = await loadDataset(activeDatasetKey);

    if (!isMounted.current) {
      return;
    }

    const targetRow =
      updatedRows.find((item) => String(item?.id) === String(row?.id)) || row;

    if (targetRow?.id) {
      selectRecord(activeDatasetKey, targetRow);
    } else {
      resetEditor(activeDatasetKey);
    }

    setBusyAction(null);
    setStatus({
      kind: 'success',
      message: editingId
        ? 'تم تحديث السجل بنجاح.'
        : 'تم إنشاء السجل بنجاح.',
    });
  }, [
    activeDataset,
    activeDatasetKey,
    adminContext,
    busyAction,
    editingId,
    formState,
    loadDataset,
    resetEditor,
    selectRecord,
  ]);

  const handleDelete = useCallback(async () => {
    if (!editingId || busyAction) return;

    if (deleteArmId !== editingId) {
      setDeleteArmId(editingId);
      setStatus({
        kind: 'error',
        message: 'اضغط حذف مرة ثانية لتأكيد الإزالة النهائية.',
      });
      return;
    }

    setBusyAction('delete');
    setStatus(null);

    const { error } = activeDataset.remove
      ? await activeDataset.remove(editingId, adminContext)
      : await deleteAdminRow({
          table: activeDataset.table,
          id: editingId,
        });

    if (!isMounted.current) {
      return;
    }

    if (error) {
      setBusyAction(null);
      setStatus({
        kind: 'error',
        message: error.message || 'تعذر حذف السجل.',
      });
      return;
    }

    await loadDataset(activeDatasetKey);

    if (!isMounted.current) {
      return;
    }

    resetEditor(activeDatasetKey);
    setBusyAction(null);
    setStatus({
      kind: 'success',
      message: 'تم حذف السجل بنجاح.',
    });
  }, [
    activeDataset,
    activeDatasetKey,
    adminContext,
    busyAction,
    deleteArmId,
    editingId,
    loadDataset,
    resetEditor,
  ]);

  const totalRecords = useMemo(
    () =>
      Object.values(rowsByDataset).reduce(
        (count, rows) => count + (Array.isArray(rows) ? rows.length : 0),
        0
      ),
    [rowsByDataset]
  );

  const renderField = useCallback(
    (field) => {
      if (field.type === 'image') {
        const value = String(formState[field.key] ?? '').trim();
        const isUploading = uploadingFieldKey === field.key;

        return (
          <View key={field.key} style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <View style={styles.uploadCard}>
              {value ? (
                <Image
                  source={{ uri: value }}
                  style={styles.uploadPreview}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Ionicons
                    name="image-outline"
                    size={28}
                    color={colors.subText}
                  />
                  <Text style={styles.uploadPlaceholderText}>
                    لم يتم اختيار صورة بعد
                  </Text>
                </View>
              )}

              <View style={styles.uploadActions}>
                <SecondaryButton
                  icon="cloud-upload-outline"
                  iconColor={colors.text}
                  label={
                    isUploading
                      ? 'جارٍ الرفع...'
                      : value
                      ? 'استبدال الصورة'
                      : 'رفع صورة'
                  }
                  onPress={() => handleImageUpload(field, false)}
                  styles={styles}
                />

                {value ? (
                  <Pressable
                    onPress={() => handleFieldChange(field.key, '')}
                    style={styles.inlineDangerButton}
                    accessibilityRole="button"
                    accessibilityLabel={`حذف ${field.label}`}
                  >
                    <Ionicons
                      name="close-outline"
                      size={16}
                      color={colors.danger}
                    />
                    <Text style={styles.inlineDangerButtonText}>
                      حذف الصورة
                    </Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
            {field.helper ? (
              <Text style={styles.helperText}>{field.helper}</Text>
            ) : null}
          </View>
        );
      }

      if (field.type === 'image-list') {
        const images = normalizeListValue(formState[field.key]);
        const isUploading = uploadingFieldKey === field.key;

        return (
          <View key={field.key} style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <View style={styles.uploadCard}>
              <View style={styles.uploadActions}>
                <SecondaryButton
                  icon="images-outline"
                  iconColor={colors.text}
                  label={isUploading ? 'جارٍ الرفع...' : 'رفع صور'}
                  onPress={() => handleImageUpload(field, true)}
                  styles={styles}
                />
                <Text style={styles.uploadCountText}>
                  {images.length
                    ? `${images.length} صورة`
                    : 'لا توجد صور مرفوعة'}
                </Text>
              </View>

              {images.length ? (
                <View style={styles.uploadGrid}>
                  {images.map((imageUrl, index) => (
                    <View key={`${imageUrl}-${index}`} style={styles.uploadGridItem}>
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.uploadGridPreview}
                        resizeMode="cover"
                      />
                      <Pressable
                        onPress={() =>
                          handleFieldChange(
                            field.key,
                            removeImageAt(formState[field.key], index)
                          )
                        }
                        style={styles.uploadRemoveBadge}
                        accessibilityRole="button"
                        accessibilityLabel={`حذف الصورة ${index + 1}`}
                      >
                        <Ionicons name="close" size={12} color={colors.white} />
                      </Pressable>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={styles.uploadPlaceholderCompact}>
                  <Text style={styles.uploadPlaceholderText}>
                    ارفع صورة واحدة أو أكثر ليتم حفظ روابطها تلقائياً.
                  </Text>
                </View>
              )}
            </View>
            {field.helper ? (
              <Text style={styles.helperText}>{field.helper}</Text>
            ) : null}
          </View>
        );
      }

      if (field.type === 'boolean') {
        const currentValue = !!formState[field.key];

        return (
          <View key={field.key} style={styles.fieldGroup}>
            <Pressable
              onPress={() => handleFieldChange(field.key, !currentValue)}
              style={styles.toggleRow}
              accessibilityRole="switch"
              accessibilityState={{ checked: currentValue }}
              accessibilityLabel={field.label}
            >
              <View style={styles.toggleLabelBlock}>
                <Text style={styles.toggleTitle}>{field.label}</Text>
                {field.description ? (
                  <Text style={styles.toggleDescription}>
                    {field.description}
                  </Text>
                ) : null}
              </View>
              <View
                style={[
                  styles.toggleTrack,
                  currentValue && styles.toggleTrackActive,
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    currentValue && styles.toggleThumbActive,
                  ]}
                />
              </View>
            </Pressable>
          </View>
        );
      }

      if (field.type === 'choice') {
        const options =
          typeof field.options === 'function'
            ? field.options(adminContext)
            : field.options || [];

        return (
          <View key={field.key} style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            {options.length ? (
              <View style={styles.choiceRow}>
                {options.map((option) => {
                  const isActive = formState[field.key] === option.value;

                  return (
                    <Pressable
                      key={option.value}
                      onPress={() => handleFieldChange(field.key, option.value)}
                      style={[
                        styles.choiceChip,
                        isActive && styles.choiceChipActive,
                      ]}
                      accessibilityRole="button"
                      accessibilityLabel={`${field.label}: ${option.label}`}
                    >
                      <Text
                        style={[
                          styles.choiceChipText,
                          isActive && styles.choiceChipTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.helperText}>
                لا توجد خيارات متاحة لهذا الحقل حالياً.
              </Text>
            )}
          </View>
        );
      }

      const isMultiline = field.type === 'multiline';

      return (
        <View key={field.key} style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{field.label}</Text>
          <TextInput
            value={String(formState[field.key] ?? '')}
            onChangeText={(value) => handleFieldChange(field.key, value)}
            placeholder={field.placeholder}
            placeholderTextColor={colors.subText}
            style={[
              styles.input,
              isMultiline && styles.inputMultiline,
            ]}
            multiline={isMultiline}
            keyboardType={field.keyboardType || 'default'}
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel={field.label}
          />
          {field.helper ? (
            <Text style={styles.helperText}>{field.helper}</Text>
          ) : null}
        </View>
      );
    },
    [
      adminContext,
      colors.danger,
      colors.subText,
      colors.text,
      colors.white,
      formState,
      handleFieldChange,
      handleImageUpload,
      styles,
      uploadingFieldKey,
    ]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="العودة"
            >
              <Ionicons name="arrow-forward" size={18} color={colors.text} />
            </Pressable>
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={styles.heroEyebrow}>الإدارة</Text>
              <Text style={styles.heroTitle}>لوحة التحكم بالمحتوى</Text>
              <Text style={styles.heroDescription}>
                أنشئ وعدل واحذف المحتوى المخزن في Supabase والذي يغذي التطبيق
                العام. أي تعديل هنا ينعكس على الأخبار والأنشطة والإنجازات
                ومعرض الصور.
              </Text>
            </View>
          </View>

          <View style={styles.heroActionRow}>
            <SecondaryButton
              icon="refresh-outline"
              iconColor={colors.text}
              label="تحديث الكل"
              onPress={handleRefreshAll}
              styles={styles}
            />
            <SecondaryButton
              icon="add-outline"
              iconColor={colors.text}
              label={`إضافة ${activeDataset.label}`}
              onPress={() => resetEditor(activeDatasetKey)}
              styles={styles}
            />
          </View>

          <View style={styles.heroNote}>
            <Text style={styles.heroNoteText}>
              هذه اللوحة تدير الأقسام المرتبطة بـ Supabase فقط. صفحة
              {' "من نحن" '}ما زالت تعتمد على ثوابت محلية، لذلك ليست ضمن هذه
              اللوحة حالياً.
            </Text>
          </View>

          <View style={styles.statsRow}>
            {DATASET_DEFINITIONS.map((definition) => (
              <View key={definition.key} style={styles.statCard}>
                <Text style={styles.statLabel}>{definition.label}</Text>
                <Text style={styles.statValue}>
                  {(rowsByDataset[definition.key] || []).length}
                </Text>
              </View>
            ))}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>إجمالي السجلات</Text>
              <Text style={styles.statValue}>{totalRecords}</Text>
            </View>
          </View>
        </View>

        <View style={styles.workspaceCard}>
          <View style={styles.workspaceHeader}>
            <Text style={styles.workspaceTitle}>مساحة العمل</Text>
            <Text style={styles.workspaceDescription}>
              بدّل بين الأقسام، اختر سجلاً موجوداً، أو أنشئ سجلاً جديداً.
            </Text>
          </View>

          <View style={styles.datasetTabs}>
            {DATASET_DEFINITIONS.map((definition) => {
              const isActive = definition.key === activeDatasetKey;

              return (
                <Pressable
                  key={definition.key}
                  onPress={() => setActiveDatasetKey(definition.key)}
                  style={[
                    styles.datasetTab,
                    isActive && styles.datasetTabActive,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={definition.label}
                >
                  <Text
                    style={[
                      styles.datasetTabText,
                      isActive && styles.datasetTabTextActive,
                    ]}
                  >
                    {definition.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.toolbarRow}>
            <Text style={styles.toolbarInfo}>
              {activeDataset.description}
            </Text>
            <Text style={styles.toolbarInfo}>
              آخر مزامنة: {formatSyncTime(lastSyncedByDataset[activeDatasetKey])}
            </Text>
          </View>

          <View
            style={[
              styles.contentRow,
              isWideLayout && styles.contentRowWide,
            ]}
          >
            <View style={[styles.panel, styles.listPanel]}>
              <View style={styles.panelHeader}>
                <Text style={styles.panelTitle}>السجلات</Text>
                <Text style={styles.panelDescription}>
                  اختر سجلاً لتعديله أو ابدأ بسجل جديد.
                </Text>
              </View>

              {activeLoading ? (
                <View style={styles.emptyState}>
                  <ActivityIndicator color={colors.primary} />
                </View>
              ) : activeError ? (
                <View
                  style={[
                    styles.statusCard,
                    styles.statusError,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      styles.statusTextError,
                    ]}
                  >
                    {activeError}
                  </Text>
                </View>
              ) : activeRows.length ? (
                <View style={styles.recordList}>
                  {activeRows.map((row) => {
                    const isSelected =
                      String(row?.id) === String(editingId);

                    return (
                      <Pressable
                        key={row?.id ?? activeDataset.getTitle(row)}
                        onPress={() => selectRecord(activeDatasetKey, row)}
                        style={({ pressed }) => [
                          styles.recordCard,
                          isSelected && styles.recordCardActive,
                          pressed && styles.recordCardPressed,
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel={activeDataset.getTitle(row)}
                      >
                        <Text style={styles.recordTitle} numberOfLines={2}>
                          {activeDataset.getTitle(row)}
                        </Text>
                        <Text style={styles.recordMeta} numberOfLines={2}>
                          {activeDataset.getMeta(row)}
                        </Text>
                        <Text style={styles.recordMeta}>المعرف #{row?.id}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    {activeDataset.emptyLabel}
                  </Text>
                </View>
              )}
            </View>

            <View style={[styles.panel, styles.editorPanel]}>
              <View style={styles.panelHeader}>
                <Text style={styles.panelTitle}>
                  {selectedRecord ? 'تعديل السجل' : 'إنشاء سجل'}
                </Text>
                <Text style={styles.panelDescription}>
                  {selectedRecord
                    ? `تعديل السجل رقم #${selectedRecord.id}`
                    : `سيتم إنشاء سجل جديد ضمن قسم ${activeDataset.label}.`}
                </Text>
              </View>

              {status ? (
                <View
                  style={[
                    styles.statusCard,
                    status.kind === 'success'
                      ? styles.statusSuccess
                      : styles.statusError,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      status.kind === 'success'
                        ? styles.statusTextSuccess
                        : styles.statusTextError,
                    ]}
                  >
                    {status.message}
                  </Text>
                </View>
              ) : null}

              {activeDataset.fields.map(renderField)}

              <View style={styles.actionsRow}>
                <PrimaryButton
                  label={
                    uploadingFieldKey
                      ? 'انتظر حتى يكتمل رفع الصور'
                      : busyAction === 'save'
                      ? 'جارٍ الحفظ...'
                      : selectedRecord
                      ? 'حفظ التعديلات'
                      : 'إنشاء السجل'
                  }
                  onPress={handleSave}
                  disabled={!!busyAction || !!uploadingFieldKey}
                  style={styles.growButton}
                />

                <SecondaryButton
                  icon="refresh-outline"
                  iconColor={colors.text}
                  label="إعادة ضبط النموذج"
                  onPress={() =>
                    selectedRecord
                      ? selectRecord(activeDatasetKey, selectedRecord)
                      : resetEditor(activeDatasetKey)
                  }
                  styles={styles}
                />

                {selectedRecord ? (
                  <Pressable
                    onPress={handleDelete}
                    disabled={!!busyAction || !!uploadingFieldKey}
                    style={styles.dangerButton}
                    accessibilityRole="button"
                    accessibilityLabel="حذف السجل"
                  >
                    <Ionicons
                      name="trash-outline"
                      size={16}
                      color={colors.danger}
                    />
                    <Text style={styles.dangerButtonText}>
                      {busyAction === 'delete'
                        ? 'جارٍ الحذف...'
                        : deleteArmId === editingId
                        ? 'تأكيد الحذف'
                        : 'حذف'}
                    </Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
