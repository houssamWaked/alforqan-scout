import { supabase } from '../lib/supabase';

export async function sendContactMessage({ name, email, message, reason }) {
  if (!name || !email || !message) {
    throw new Error('Missing contact fields');
  }

  const fullMessage =
    reason && reason.trim().length > 0
      ? `[Reason] ${reason}\n\n${message}`
      : message;

  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    message: fullMessage,
  });

  if (error) {
    console.error('sendContactMessage error:', error);
    throw error;
  }

  return true;
}

export default sendContactMessage;
