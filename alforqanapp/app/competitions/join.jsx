import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import contactStyles from '../../src/Styles/ContactUsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import SectionHeader from '../../src/components/SectionHeader';
import PrimaryButton from '../../src/components/PrimaryButton';
import { useCompetitionForm } from '../../src/hooks/useCompetitionForm';

function CompetitionTextInput({
  styles,
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  error,
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.textArea,
          error && { borderColor: 'red' },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        multiline={multiline}
        textAlign="right"
      />
      {error ? (
        <Text style={[styles.statusText, styles.errorText]}>{error}</Text>
      ) : null}
    </View>
  );
}

function CompetitionSelect({
  styles,
  label,
  value,
  onChange,
  placeholder,
  options,
  error,
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen((prev) => !prev)}
        style={[
          styles.input,
          { justifyContent: 'center' },
          error && { borderColor: 'red' },
        ]}
      >
        <Text style={{ textAlign: 'right', color: value ? '#000' : '#999' }}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
      {error ? (
        <Text style={[styles.statusText, styles.errorText]}>{error}</Text>
      ) : null}
      {open && (
        <View
          style={{
            marginTop: 6,
            borderRadius: 12,
            backgroundColor: '#fff',
            overflow: 'hidden',
          }}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 10,
                alignItems: 'flex-end',
              }}
              activeOpacity={0.9}
              onPress={() => handleSelect(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

function CompetitionRadioGroup({
  styles,
  label,
  value,
  onChange,
  error,
}) {
  const options = [
    { value: 'yes', label: 'نعم' },
    { value: 'no', label: 'لا' },
  ];

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 6,
        }}
      >
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() => onChange(opt.value)}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 16,
              }}
            >
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  borderWidth: 2,
                  borderColor: selected ? '#4CAF50' : '#999',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 6,
                }}
              >
                {selected && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#4CAF50',
                    }}
                  />
                )}
              </View>
              <Text style={{ textAlign: 'right' }}>{opt.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error ? (
        <Text style={[styles.statusText, styles.errorText]}>{error}</Text>
      ) : null}
    </View>
  );
}

export default function JoinCompetitionScreen() {
  const styles = useThemedStyles(contactStyles);

  const {
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
    errors,
    isValid,
    submitting,
    handleSubmit,
  } = useCompetitionForm();

  const handleRegister = async () => {
    const payload = await handleSubmit();
    if (!payload) return;

    Alert.alert(
      'تم استلام طلبك',
      'تم استلام طلبك وسيتم التواصل معك قريبًا'
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { flex: 1 }]}>
      <ScrollView
        style={[styles.scroll, { flex: 1 }]}
        contentContainerStyle={[styles.container, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader
          title="انضم إلى الكشافة"
          subtitle="املأ النموذج التالي لتسجيل طلب انضمامك إلى الفرقة الكشفية."
        />

        <View style={styles.card}>
          <Text style={styles.formTitle}>المعلومات الشخصية</Text>

          <CompetitionTextInput
            styles={styles}
            label="الاسم الكامل *"
            value={fullName}
            onChangeText={setFullName}
            placeholder="اكتب اسمك الكامل"
            error={errors.fullName}
          />

          <CompetitionTextInput
            styles={styles}
            label="العمر *"
            value={age}
            onChangeText={setAge}
            placeholder="مثال: 15"
            keyboardType="numeric"
            error={errors.age}
          />

          <CompetitionSelect
            styles={styles}
            label="الجنسية *"
            value={nationality}
            onChange={setNationality}
            placeholder="اختر الجنسية"
            options={['لبنانية', 'سورية', 'فلسطينية', 'أخرى…']}
            error={errors.nationality}
          />

          <CompetitionTextInput
            styles={styles}
            label="رقم الهاتف *"
            value={phone}
            onChangeText={setPhone}
            placeholder="اكتب رقم هاتفك"
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <CompetitionTextInput
            styles={styles}
            label="البريد الإلكتروني"
            value={email}
            onChangeText={setEmail}
            placeholder="example@email.com"
            keyboardType="email-address"
            error={errors.email}
          />

          <Text style={[styles.formTitle, { marginTop: 16 }]}>
            المعلومات الكشفية
          </Text>

          <CompetitionTextInput
            styles={styles}
            label="الفرقة / الطليعة"
            value={unit}
            onChangeText={setUnit}
            placeholder="اسم الفرقة أو الطليعة"
            error={errors.unit}
          />

          <CompetitionSelect
            styles={styles}
            label="الرتبة الكشفية الحالية"
            value={rank}
            onChange={setRank}
            placeholder="اختر الرتبة الكشفية"
            options={['مبتدئ', 'كشاف', 'متقدم', 'جوال']}
            error={errors.rank}
          />

          <CompetitionTextInput
            styles={styles}
            label="سنوات الخبرة الكشفية"
            value={experienceYears}
            onChangeText={setExperienceYears}
            placeholder="مثال: 3"
            keyboardType="numeric"
            error={errors.experienceYears}
          />

          <Text style={[styles.formTitle, { marginTop: 16 }]}>
            معلومات عن الانضمام
          </Text>

          <CompetitionTextInput
            styles={styles}
            label="لماذا تريد الانضمام إلى الكشافة؟ *"
            value={motivation}
            onChangeText={setMotivation}
            placeholder="اكتب سبب رغبتك في الانضمام"
            multiline
            error={errors.motivation}
          />

          <CompetitionRadioGroup
            styles={styles}
            label="هل لديك خبرة كشفية سابقة؟ *"
            value={hasPrevious}
            onChange={setHasPrevious}
            error={errors.hasPrevious}
          />

          {hasPrevious === 'yes' && (
            <CompetitionTextInput
              styles={styles}
              label="اذكر الخبرات أو الأنشطة السابقة"
              value={previousCompetitions}
              onChangeText={setPreviousCompetitions}
              placeholder="اكتب الخبرات أو الأنشطة الكشفية السابقة"
              multiline
              error={errors.previousCompetitions}
            />
          )}

          <PrimaryButton
            label={submitting ? 'جاري الإرسال...' : 'تسجيل المشاركة'}
            onPress={handleRegister}
            disabled={!isValid || submitting}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
