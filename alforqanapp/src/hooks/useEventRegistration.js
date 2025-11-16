import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';

export function useEventRegistration(options = {}) {
  const { onSuccess } = options;

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

  const handleSubmit = useCallback(() => {
    if (submitting) return;

    setSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        nationality: nationality.trim(),
        residence: residence.trim(),
        participationChoice,
        scoutStatus,
        notes: notes.trim(),
      };

      if (onSuccess) {
        onSuccess(payload);
      }

      Alert.alert('تم التسجيل', 'تم تسجيل مشاركتك في هذا النشاط بنجاح!');

      setVisible(false);
      setName('');
      setNationality('');
      setResidence('');
      setNotes('');
    } finally {
      setSubmitting(false);
    }
  }, [
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
