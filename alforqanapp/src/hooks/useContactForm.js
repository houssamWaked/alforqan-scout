import { useCallback, useState } from 'react';
import { CONTACT_TEXT } from '../../constants/texts/contactTexts';
import { sendContactMessage } from '../services/contactService';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validate = useCallback(() => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(CONTACT_TEXT.errorRequired);
      return false;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setError(CONTACT_TEXT.errorEmail);
      return false;
    }

    return true;
  }, [name, email, message]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;

    setError(null);
    setSuccess(null);

    if (!validate()) return;

    try {
      setSubmitting(true);
      await sendContactMessage({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setSuccess(CONTACT_TEXT.successMessage);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('sendContactMessage error:', err);
      setError(CONTACT_TEXT.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }, [email, message, name, submitting, validate]);

  return {
    name,
    email,
    message,
    submitting,
    error,
    success,
    setName,
    setEmail,
    setMessage,
    handleSubmit,
  };
}

export default useContactForm;

