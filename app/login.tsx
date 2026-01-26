import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { ROLE_LABELS } from "@/constants/auth";
import { useAuth } from "@/hooks/use-auth";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { HomeCardStyleProps } from "@/types/home";

export default function LoginScreen() {
  const router = useRouter();
  const { login, role } = useAuth();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const surfaceColor = useThemeColor({}, "surface");
  const surfaceMutedColor = useThemeColor({}, "surfaceMuted");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const styles = createStyles({
    textColor,
    mutedTextColor,
    tintColor,
    borderColor,
    surfaceColor,
    surfaceMutedColor,
  });

  const handleLogin = () => {
    const result = login(username, password);

    if (!result.success) {
      setErrorMessage(result.message ?? "Κάτι πήγε στραβά.");
      return;
    }

    setErrorMessage("");
    router.replace("/(tabs)");
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.card}>
        <Text style={styles.title}>Πρόσβαση Προσωπικού</Text>
        <Text style={styles.subtitle}>
          Συνδέσου ως οδηγός, υπάλληλος ή διαχειριστής.
        </Text>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Όνομα χρήστη</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="π.χ. driver"
            placeholderTextColor={mutedTextColor}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Κωδικός</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="π.χ. driver123"
            placeholderTextColor={mutedTextColor}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            style={styles.textInput}
          />
        </View>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <Pressable
          accessibilityRole="button"
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>Σύνδεση</Text>
        </Pressable>
        <Text style={styles.helperText}>
          Δοκιμαστικά στοιχεία: driver/driver123,
          employee/employee123
        </Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Τρέχων ρόλος:</Text>
          <Text style={styles.statusValue}>{ROLE_LABELS[role]}</Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = ({
  textColor,
  mutedTextColor,
  tintColor,
  borderColor,
  surfaceColor,
  surfaceMutedColor,
}: HomeCardStyleProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: "center",
    },
    card: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor,
      backgroundColor: surfaceColor,
      padding: 20,
      gap: 12,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      color: textColor,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 14,
      color: mutedTextColor,
      textAlign: "center",
    },
    inputGroup: {
      gap: 6,
    },
    inputLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: mutedTextColor,
    },
    textInput: {
      borderWidth: 1,
      borderColor,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      color: textColor,
      backgroundColor: surfaceMutedColor,
    },
    errorText: {
      fontSize: 12,
      color: tintColor,
      fontWeight: "600",
    },
    primaryButton: {
      alignSelf: "center",
      marginTop: 4,
      paddingHorizontal: 22,
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: tintColor,
    },
    primaryButtonPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    primaryButtonText: {
      fontSize: 15,
      fontWeight: "700",
      color: surfaceColor,
    },
    helperText: {
      fontSize: 12,
      color: mutedTextColor,
      lineHeight: 16,
      textAlign: "center",
    },
    statusRow: {
      marginTop: 8,
      flexDirection: "row",
      justifyContent: "center",
      gap: 6,
    },
    statusLabel: {
      fontSize: 12,
      color: mutedTextColor,
    },
    statusValue: {
      fontSize: 12,
      fontWeight: "700",
      color: textColor,
    },
  });
