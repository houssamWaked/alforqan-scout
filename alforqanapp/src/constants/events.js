// src/constants/events.js

// Labels for filters
export function getEventTypeLabel(type) {
  switch (type) {
    case 'camp':
      return 'معسكر';
    case 'competition':
      return 'مسابقة';
    case 'service':
      return 'خدمة';
    case 'training':
      return 'تدريب';
    default:
      return 'فعالية غير معروفة';
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
