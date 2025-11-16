import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import contactStyles from '../Styles/ContactUsStyleSheet';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useTheme } from '../hooks/useTheme';

const REASONS = [
  'الانضمام إلى وحدة',
  'مشكلة في التطبيق',
  'سؤال عام',
  'طلب مساعدة',
  'ملاحظات واقتراحات',
  'أخرى',
];

export default function ContactReasonScreen() {
  const styles = useThemedStyles(contactStyles);
  const { colors } = useTheme();
  const router = useRouter();

  const handleSelect = useCallback(
    (reason) => {
      router.push({
        pathname: '/contact/form',
        params: { reason },
      });
    },
    [router]
  );

  return (
    <SafeAreaView style={[styles.safeArea, { flex: 1 }]}>
      <ScrollView
        style={[styles.scroll, { flex: 1 }]}
        contentContainerStyle={[styles.container, { paddingBottom: 120 }]}
      >
        <View style={styles.card}>
          <Text style={styles.formTitle}>كيف نقدر نساعدك؟</Text>
          <Text
            style={[
              styles.fieldLabel,
              { marginBottom: 12, color: colors.subText },
            ]}
          >
            اختر سبب التواصل المناسب.
          </Text>

          {REASONS.map((reason) => (
            <Pressable
              key={reason}
              onPress={() => handleSelect(reason)}
              style={({ pressed }) => [
                {
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                  marginBottom: 8,
                  alignItems: 'flex-end',
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
              android_ripple={{
                color: 'rgba(0,0,0,0.06)',
                borderless: false,
              }}
              accessibilityRole="button"
              accessibilityLabel={reason}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: colors.text,
                  textAlign: 'right',
                }}
              >
                {reason}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
