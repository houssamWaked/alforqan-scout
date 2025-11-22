import { useState, useMemo, useCallback } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{6,}$/;

export function useCompetitionForm() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [unit, setUnit] = useState('');
  const [rank, setRank] = useState('');
  const [experienceYears, setExperienceYears] = useState('');

  const [motivation, setMotivation] = useState('');
  const [hasPrevious, setHasPrevious] = useState(null);
  const [previousCompetitions, setPreviousCompetitions] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const result = {};

    if (!fullName.trim()) {
      result.fullName = 'الاسم الكامل مطلوب';
    }

    const ageNumber = Number(age);
    if (!age.trim()) {
      result.age = 'العمر مطلوب';
    } else if (Number.isNaN(ageNumber) || ageNumber <= 0) {
      result.age = 'يرجى إدخال عمر صالح';
    }

    if (!nationality.trim()) {
      result.nationality = 'الرجاء اختيار الجنسية';
    }

    if (!phone.trim()) {
      result.phone = 'رقم الهاتف مطلوب';
    } else if (!PHONE_REGEX.test(phone.trim())) {
      result.phone = 'يرجى إدخال رقم هاتف صالح';
    }

    if (email.trim() && !EMAIL_REGEX.test(email.trim())) {
      result.email = 'البريد الإلكتروني غير صالح';
    }

    if (!motivation.trim()) {
      result.motivation = 'الرجاء كتابة سبب الانضمام';
    }

    if (!hasPrevious) {
      result.hasPrevious = 'الرجاء اختيار نعم أو لا';
    } else if (hasPrevious === 'yes' && !previousCompetitions.trim()) {
      result.previousCompetitions = 'الرجاء ذكر الخبرات السابقة';
    }

    return result;
  }, [
    fullName,
    age,
    nationality,
    phone,
    email,
    motivation,
    hasPrevious,
    previousCompetitions,
  ]);

  const isValid = useMemo(
    () => Object.keys(errors).length === 0,
    [errors]
  );

  const handleSubmit = useCallback(async () => {
    setSubmitted(true);

    if (!isValid || submitting) {
      return null;
    }

    const payload = {
      fullName: fullName.trim(),
      age: Number(age),
      nationality: nationality.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      unit: unit.trim() || null,
      rank: rank.trim() || null,
      experienceYears: experienceYears.trim()
        ? Number(experienceYears)
        : null,
      motivation: motivation.trim(),
      hasPrevious: hasPrevious === 'yes',
      previousCompetitions:
        hasPrevious === 'yes' && previousCompetitions.trim()
          ? previousCompetitions.trim()
          : null,
    };

    try {
      setSubmitting(true);
      // For now, just log the payload. Replace with real API call later.
      console.log('Competition registration:', payload);
      return payload;
    } finally {
      setSubmitting(false);
    }
  }, [
    isValid,
    submitting,
    fullName,
    age,
    nationality,
    phone,
    email,
    unit,
    rank,
    experienceYears,
    motivation,
    hasPrevious,
    previousCompetitions,
  ]);

  return {
    fullName,
    setFullName,
    age,
    setAge,
    nationality,
    setNationality,
    phone,
    setPhone,
    email,
    setEmail,
    unit,
    setUnit,
    rank,
    setRank,
    experienceYears,
    setExperienceYears,
    motivation,
    setMotivation,
    hasPrevious,
    setHasPrevious,
    previousCompetitions,
    setPreviousCompetitions,
    errors: submitted ? errors : {},
    isValid,
    submitting,
    handleSubmit,
  };
}

export default useCompetitionForm;
