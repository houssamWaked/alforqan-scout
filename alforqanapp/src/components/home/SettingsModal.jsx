// src/components/home/SettingsModal.jsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import homeStyles from '../../Styles/HomeStyleSheet';

export default function SettingsModal({ visible, onClose }) {
  const { scheme, toggleScheme } = useTheme();
  const styles = useThemedStyles(homeStyles);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.settingsModalBackdrop}>
        <View style={styles.settingsModalContainer}>
          <Text style={styles.settingsModalTitle}>الإعدادات</Text>

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

          <TouchableOpacity
            style={styles.settingsModalCloseButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.settingsModalCloseText}>إغلاق</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
