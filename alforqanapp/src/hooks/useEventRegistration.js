import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { submitEventRegistration } from '../services/eventRegistrationService';

export function useEventRegistration(options = {}) {
  const { onSuccess, eventId } = options;

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [residence, setResidence] = useState('');
  const [participationChoice, setParticipationChoice] = useState('yes');
  const [scoutStatus, setScoutStatus] = useState('member');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;

    const payload = {
      name: name.trim(),
      nationality: nationality.trim(),
      residence: residence.trim(),
      participationChoice,
      scoutStatus,
      notes: notes.trim(),
    };

    if (!payload.name) {
      Alert.alert('تنبيه', 'الرجاء إدخال الاسم قبل المتابعة.');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await submitEventRegistration(eventId, payload);

      if (error) {
        Alert.alert(
          'حدث خطأ',
          'تعذر حفظ التسجيل، يرجى المحاولة مرة أخرى.'
        );
      } else {
        if (onSuccess) {
          onSuccess(payload);
        }

        Alert.alert(
          'تم الإرسال',
          'تم تسجيل طلب الانضمام بنجاح!'
        );

        setVisible(false);
        setName('');
        setNationality('');
        setResidence('');
        setNotes('');
      }
    } finally {
      setSubmitting(false);
    }
  }, [
    eventId,
    name,
    nationality,
    notes,
    onSuccess,
    participationChoice,
    residence,
    scoutStatus,
    submitting,
  ]);

  const state = useMemo(
    () => ({
      visible,
      name,
      nationality,
      residence,
      participationChoice,
      scoutStatus,
      notes,
      submitting,
    }),
    [
      name,
      nationality,
      notes,
      participationChoice,
      residence,
      scoutStatus,
      submitting,
      visible,
    ]
  );

  const actions = useMemo(
    () => ({
      open,
      close,
      setName,
      setNationality,
      setResidence,
      setParticipationChoice,
      setScoutStatus,
      setNotes,
      handleSubmit,
    }),
    [close, handleSubmit, open]
  );

  return {
    ...state,
    ...actions,
  };
}

export default useEventRegistration;
