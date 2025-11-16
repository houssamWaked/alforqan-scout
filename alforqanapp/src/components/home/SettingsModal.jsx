import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function SettingsModal({ visible, onClose }) {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            الإعدادات
          </Text>

          <View style={styles.items}>
            <TouchableOpacity style={styles.item} activeOpacity={0.7}>
              <Text style={[styles.itemText, { color: colors.text }]}>
                المظهر (قريبًا)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} activeOpacity={0.7}>
              <Text style={[styles.itemText, { color: colors.text }]}>
                عن التطبيق
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} activeOpacity={0.7}>
              <Text style={[styles.itemText, { color: colors.text }]}>
                الشروط والأحكام
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.closeButton, { borderColor: colors.border }]}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={[styles.closeText, { color: colors.primary }]}>
              إغلاق
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'right',
    marginBottom: 12,
  },
  items: {
    marginTop: 8,
  },
  item: {
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 15,
    textAlign: 'right',
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

