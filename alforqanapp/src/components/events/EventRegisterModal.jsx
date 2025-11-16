import React, { memo, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Animated,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import PrimaryButton from '../PrimaryButton';

function RadioOption({ label, selected, onPress }) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.radioRow, pressed && { opacity: 0.9 }]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View
        style={[
          styles.radioOuter,
          { borderColor: selected ? colors.primary : colors.border },
        ]}
      >
        {selected ? (
          <View
            style={[styles.radioInner, { backgroundColor: colors.primary }]}
          />
        ) : null}
      </View>

      <Text style={[styles.radioLabel, { color: colors.text }]}>{label}</Text>
    </Pressable>
  );
}

function EventRegisterModal({
  visible,
  onClose,
  name,
  nationality,
  residence,
  participationChoice,
  scoutStatus,
  notes,
  submitting,
  onChangeName,
  onChangeNationality,
  onChangeResidence,
  onChangeParticipation,
  onChangeScoutStatus,
  onChangeNotes,
  onSubmit,
}) {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [fadeAnim, visible]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles.overlay,
          { backgroundColor: 'rgba(0,0,0,0.45)', opacity: fadeAnim },
        ]}
      >
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          {/* TITLE */}
          <Text style={[styles.title, { color: colors.text }]}>
            تسجيل المشاركة
          </Text>

          {/* QUESTION */}
          <Text style={[styles.question, { color: colors.subText }]}>
            هل ترغب بالانضمام إلى الفعالية؟
          </Text>

          {/* BASIC INFO */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              الاسم الكامل
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.card,
                },
              ]}
              value={name}
              onChangeText={onChangeName}
              placeholder="اكتب اسمك"
              placeholderTextColor={colors.subText}
              textAlign="right"
            />

            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              الجنسية
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.card,
                },
              ]}
              value={nationality}
              onChangeText={onChangeNationality}
              placeholder="ما هي جنسيتك؟"
              placeholderTextColor={colors.subText}
              textAlign="right"
            />

            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              مكان الإقامة
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.card,
                },
              ]}
              value={residence}
              onChangeText={onChangeResidence}
              placeholder="أين تقيم حالياً؟"
              placeholderTextColor={colors.subText}
              textAlign="right"
            />
          </View>

          {/* Participation choice */}
          <View style={styles.section}>
            <RadioOption
              label="نعم، أريد المشاركة في الفعالية"
              selected={participationChoice === 'yes'}
              onPress={() => onChangeParticipation('yes')}
            />

            <RadioOption
              label="لا، فقط أريد متابعة التفاصيل"
              selected={participationChoice === 'no'}
              onPress={() => onChangeParticipation('no')}
            />
          </View>

          {/* Scout status (participation does NOT require membership) */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            هل أنت عضو في الكشافة؟
          </Text>

          <View style={styles.section}>
            <RadioOption
              label="نعم، عضو في الكشافة"
              selected={scoutStatus === 'member'}
              onPress={() => onChangeScoutStatus('member')}
            />

            <RadioOption
              label="لا، لست عضواً في الكشافة (يمكنني المشاركة كضيف)"
              selected={scoutStatus === 'guest'}
              onPress={() => onChangeScoutStatus('guest')}
            />
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <TextInput
              style={[
                styles.notesInput,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.card,
                },
              ]}
              placeholder="اكتب ملاحظة (اختياري)"
              placeholderTextColor={colors.subText}
              value={notes}
              onChangeText={onChangeNotes}
              multiline
              textAlign="right"
              textAlignVertical="top"
            />
          </View>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <PrimaryButton
              label="تأكيد التسجيل"
              onPress={onSubmit}
              disabled={submitting}
              style={styles.primaryButton}
            />

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.cancelButton,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                },
                pressed && { opacity: 0.9 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="إغلاق"
            >
              <Text style={[styles.cancelText, { color: colors.subText }]}>
                إغلاق
              </Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'right',
    marginBottom: 8,
  },
  question: {
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 6,
  },
  sectionLabel: {
    fontSize: 13,
    textAlign: 'right',
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  radioLabel: {
    fontSize: 14,
    textAlign: 'right',
    flex: 1,
  },
  notesInput: {
    minHeight: 80,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    marginLeft: 8,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  cancelText: {
    fontSize: 14,
  },
});

export default memo(EventRegisterModal);

