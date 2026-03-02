import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import homeStyles from '../../Styles/HomeStyleSheet';

const ADMIN_TAP_THRESHOLD = 8;
const ADMIN_TAP_RESET_MS = 4000;
const ADMIN_PIN = process.env.EXPO_PUBLIC_ADMIN_PIN || '';

export default function SettingsModal({ visible, onClose, onOpenAdmin }) {
  const { scheme, toggleScheme } = useTheme();
  const styles = useThemedStyles(homeStyles);
  const tapCountRef = useRef(0);
  const resetTimerRef = useRef(null);
  const [gestureArmed, setGestureArmed] = useState(false);
  const [pinVisible, setPinVisible] = useState(false);
  const [pinValue, setPinValue] = useState('');
  const [pinError, setPinError] = useState(null);

  const resetHiddenGesture = useCallback(() => {
    tapCountRef.current = 0;
    setGestureArmed(false);

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const resetPinPrompt = useCallback(() => {
    setPinVisible(false);
    setPinValue('');
    setPinError(null);
  }, []);

  useEffect(() => {
    if (!visible) {
      resetHiddenGesture();
      resetPinPrompt();
    }

    return () => {
      resetHiddenGesture();
      resetPinPrompt();
    };
  }, [resetHiddenGesture, resetPinPrompt, visible]);

  const scheduleGestureReset = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
      setGestureArmed(false);
      resetTimerRef.current = null;
    }, ADMIN_TAP_RESET_MS);
  }, []);

  const handleArmGesture = useCallback(() => {
    tapCountRef.current = 0;
    setGestureArmed(true);
    scheduleGestureReset();
  }, [scheduleGestureReset]);

  const handleHiddenAdminTap = useCallback(() => {
    if (!gestureArmed) {
      return;
    }

    tapCountRef.current += 1;

    if (tapCountRef.current >= ADMIN_TAP_THRESHOLD) {
      resetHiddenGesture();
      setPinVisible(true);
      setPinError(null);
      return;
    }

    scheduleGestureReset();
  }, [gestureArmed, resetHiddenGesture, scheduleGestureReset]);

  const handlePinSubmit = useCallback(() => {
    if (!ADMIN_PIN) {
      setPinError('لم يتم ضبط رمز دخول الإدارة في ملف الإعدادات.');
      return;
    }

    if (pinValue.trim() !== ADMIN_PIN) {
      setPinError('رمز الدخول غير صحيح.');
      return;
    }

    resetPinPrompt();
    onOpenAdmin?.();
  }, [onOpenAdmin, pinValue, resetPinPrompt]);

  const handleClose = useCallback(() => {
    resetHiddenGesture();
    resetPinPrompt();
    onClose?.();
  }, [onClose, resetHiddenGesture, resetPinPrompt]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.settingsModalBackdrop}>
        <View style={styles.settingsModalContainer}>
          <Pressable
            onPress={handleHiddenAdminTap}
            onLongPress={handleArmGesture}
            delayLongPress={500}
            accessible={false}
          >
            <Text style={styles.settingsModalTitle}>الإعدادات</Text>
          </Pressable>

          <View style={styles.settingsModalItems}>
            <TouchableOpacity
              style={styles.settingsModalItem}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="تغيير المظهر"
              onPress={toggleScheme}
            >
              <Text style={styles.settingsModalItemText}>
                {scheme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingsModalItem}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="عن التطبيق"
            >
              <Text style={styles.settingsModalItemText}>عن التطبيق</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingsModalItem}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="الشروط والأحكام"
            >
              <Text style={styles.settingsModalItemText}>الشروط والأحكام</Text>
            </TouchableOpacity>
          </View>

          {pinVisible ? (
            <View style={styles.adminPinCard}>
              <Text style={styles.adminPinTitle}>رمز دخول الإدارة</Text>
              <Text style={styles.adminPinHint}>
                اضغط مطولاً على العنوان ثم اضغط 8 مرات، وبعدها أدخل الرمز.
              </Text>
              <TextInput
                value={pinValue}
                onChangeText={(value) => {
                  setPinValue(value);
                  if (pinError) {
                    setPinError(null);
                  }
                }}
                style={styles.adminPinInput}
                placeholder="أدخل الرمز"
                placeholderTextColor={styles.settingsModalItemText.color}
                secureTextEntry
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="رمز دخول الإدارة"
              />
              {pinError ? (
                <Text style={styles.adminPinError}>{pinError}</Text>
              ) : null}
              <View style={styles.adminPinActions}>
                <TouchableOpacity
                  style={styles.settingsModalCloseButton}
                  onPress={resetPinPrompt}
                  activeOpacity={0.8}
                >
                  <Text style={styles.settingsModalCloseText}>إلغاء</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.adminPinPrimaryButton}
                  onPress={handlePinSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.adminPinPrimaryText}>دخول</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.settingsModalCloseButton}
            onPress={handleClose}
            activeOpacity={0.8}
          >
            <Text style={styles.settingsModalCloseText}>إغلاق</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
