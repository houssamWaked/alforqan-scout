import { supabase } from '../lib/supabase';

const FALLBACK_TABLE = 'contact_messages';
const TARGET_TABLE = 'event_registrations';

function buildPayload(eventId, form) {
  return {
    event_id: eventId,
    name: form.name,
    nationality: form.nationality,
    residence: form.residence,
    participation_choice: form.participationChoice,
    scout_status: form.scoutStatus,
    notes: form.notes,
  };
}

async function insertRegistration(eventId, form) {
  const { data, error } = await supabase
    .from(TARGET_TABLE)
    .insert([buildPayload(eventId, form)])
    .select()
    .maybeSingle();

  return { registration: data, error };
}

async function insertFallback(form) {
  const message = [
    `الاسم: ${form.name}`,
    `الجنسية: ${form.nationality}`,
    `الإقامة: ${form.residence}`,
    `المشاركة: ${form.participationChoice}`,
    `حالة العضوية: ${form.scoutStatus}`,
    form.notes ? `ملاحظات: ${form.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const { data, error } = await supabase
    .from(FALLBACK_TABLE)
    .insert([
      {
        name: form.name || 'بدون اسم',
        email: '',
        message,
      },
    ])
    .select()
    .maybeSingle();

  return { registration: data, error };
}

export async function submitEventRegistration(eventId, form) {
  if (!eventId) {
    return { registration: null, error: new Error('Event id is required') };
  }

  const payload = buildPayload(eventId, form);

  try {
    const { registration, error } = await insertRegistration(
      eventId,
      payload
    );
    if (!error) return { registration, error: null };

    // Fallback to contact_messages if the main table is missing
    const missingTable =
      error?.message?.toLowerCase().includes('does not exist') ||
      error?.message?.toLowerCase().includes('not exist');

    if (missingTable) {
      return insertFallback(form);
    }

    return { registration: null, error };
  } catch (err) {
    return { registration: null, error: err };
  }
}

export default submitEventRegistration;
