const EVENT_TYPE_LABELS = {
  camp: 'معسكر',
  competition: 'مسابقة',
  service: 'خدمة',
  training: 'تدريب',
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

export function normalizeEventType(value) {
  const normalized = String(value || '').trim();

  if (!normalized) {
    return 'camp';
  }

  return isAsciiSlug(normalized) ? normalized.toLowerCase() : normalized;
}

export function getEventTypeLabel(type) {
  const normalized = normalizeEventType(type);
  return EVENT_TYPE_LABELS[normalized] || humanizeAsciiSlug(normalized) || 'فعالية';
}

export function getEventTypeIcon(type) {
  const normalized = normalizeEventType(type);

  switch (normalized) {
    case 'camp':
      return 'bonfire-outline';
    case 'competition':
      return 'trophy-outline';
    case 'service':
      return 'hand-left-outline';
    case 'training':
      return 'school-outline';
    default:
      return 'sparkles-outline';
  }
}

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
