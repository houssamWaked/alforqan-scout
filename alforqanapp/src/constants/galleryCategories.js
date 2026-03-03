const GALLERY_CATEGORY_LABELS = {
  activities: 'الأنشطة',
  achievements: 'الإنجازات',
  news: 'الأخبار',
  gallery: 'المعرض',
};

function isAsciiSlug(value) {
  return /^[a-z0-9 _-]+$/i.test(value);
}

function humanizeAsciiSlug(value) {
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function normalizeGalleryCategory(value) {
  const normalized = String(value || '').trim();
  if (!normalized) {
    return '';
  }

  return isAsciiSlug(normalized) ? normalized.toLowerCase() : normalized;
}

export function getGalleryCategoryLabel(value) {
  const normalized = normalizeGalleryCategory(value);
  if (!normalized) {
    return 'بدون تصنيف';
  }

  return (
    GALLERY_CATEGORY_LABELS[normalized] ||
    humanizeAsciiSlug(normalized) ||
    normalized
  );
}
