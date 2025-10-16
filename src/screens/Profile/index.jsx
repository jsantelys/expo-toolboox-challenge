import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useProfile } from './hooks/useProfile';

export function Profile() {
  const { t, locale, currentUser, theme, handleLanguageChange, handleLogout } = useProfile();

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        <View style={styles.section}>
          <ThemedText style={styles.sectionLabel}>
            {t('profile.welcome')}
          </ThemedText>
          <ThemedText style={styles.userName}>
            {currentUser?.name || 'Guest'}
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionLabel}>
            {t('profile.language')}
          </ThemedText>
          <ThemedText style={styles.sectionSubtitle}>
            {t('profile.selectLanguage')}
          </ThemedText>

          <View style={styles.languageButtons}>
            <TouchableOpacity
              style={[
                styles.languageButton,
                { borderColor: theme.colors.border },
                locale === 'en' && {
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.colors.primary,
                },
              ]}
              onPress={() => handleLanguageChange('en')}
            >
              <ThemedText
                style={[
                  styles.languageButtonText,
                  locale === 'en' && styles.languageButtonTextActive,
                ]}
              >
                {t('profile.english')}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.languageButton,
                { borderColor: theme.colors.border },
                locale === 'es' && {
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.colors.primary,
                },
              ]}
              onPress={() => handleLanguageChange('es')}
            >
              <ThemedText
                style={[
                  styles.languageButtonText,
                  locale === 'es' && styles.languageButtonTextActive,
                ]}
              >
                {t('profile.spanish')}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: theme.colors.notification }]}
            onPress={handleLogout}
          >
            <ThemedText style={styles.logoutButtonText}>
              {t('profile.logout')}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.5,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  languageButtonTextActive: {
    color: '#FFFFFF',
  },
  logoutButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
