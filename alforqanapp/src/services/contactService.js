/**
 * Mock contact service.
 *
 * In the future this can post to a backend or Supabase function.
 * For now it simply resolves successfully so the UI flow can be wired.
 */
export async function sendContactMessage({ name, email, message, reason }) {
  if (!name || !email || !message) {
    throw new Error('Missing contact fields');
  }

  // TODO: Replace with real network call.
  // `reason` is currently unused but accepted to support the new multi-step flow.
  return true;
}

export default sendContactMessage;
