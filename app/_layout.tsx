import { Stack } from "expo-router";
import { View } from "react-native";

import { AppProviders } from "@/components/AppProviders";
import { AppSafeArea } from "@/components/AppSafeArea";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function RootLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  return (
    <AppProviders>
      <AppSafeArea>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: textColor },
            headerBackground: () => (
              <View
                style={{
                  flex: 1,
                  backgroundColor: textColor,
                  borderBottomColor: tintColor,
                  borderBottomWidth: 2,
                }}
              />
            ),
            headerTintColor: backgroundColor,
            headerTitleStyle: { fontWeight: "600", color: backgroundColor },
            contentStyle: { backgroundColor },
          }}
        >
          <Stack.Screen
            name="(tabs)/index"
            options={{ title: "Smart Tourist Bus", headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)/mobile-qr"
            options={{ title: "Συνέχισε στο Κινητό" }}
          />
          <Stack.Screen
            name="login"
            options={{ title: "Σύνδεση Προσωπικού" }}
          />
          <Stack.Screen
            name="(tabs)/climate-control/index"
            options={{ title: "Έλεγχος Κλίματος" }}
          />
          <Stack.Screen
            name="(tabs)/driver/index"
            options={{ title: "Πίνακας Οδηγού" }}
          />
          <Stack.Screen
            name="(tabs)/driver/assistance"
            options={{ title: "Υποβοήθηση Οδηγού" }}
          />
          <Stack.Screen
            name="(tabs)/employee-control/index"
            options={{ title: "Έλεγχος Προσωπικού" }}
          />
          <Stack.Screen
            name="(tabs)/energy-dashboard/index"
            options={{ title: "Πίνακας Ενέργειας" }}
          />
          <Stack.Screen
            name="(tabs)/interactions/index"
            options={{ title: "Αλληλεπιδράσεις Επιβατών" }}
          />
          <Stack.Screen
            name="(tabs)/passenger/index"
            options={{ title: "Ζωντανή θέα" }}
          />
          <Stack.Screen
            name="(tabs)/passenger/nearby-attractions"
            options={{ title: "Κοντινά Αξιοθέατα" }}
          />
          <Stack.Screen
            name="(tabs)/passenger/nearby-coffee-shops"
            options={{ title: "Κοντινά Καφέ" }}
          />
          <Stack.Screen
            name="(tabs)/passenger/route-view"
            options={{ title: "Προβολή Διαδρομής" }}
          />
          <Stack.Screen
            name="(tabs)/passenger/city-navigation"
            options={{ title: "Πλοήγηση Πόλης" }}
          />
          <Stack.Screen
            name="(tabs)/passenger/cafe-orders"
            options={{ title: "Παραγγελία Καφέ" }}
          />
          <Stack.Screen
            name="(tabs)/robot-vacuum/index"
            options={{ title: "Ρομπότ Καθαρισμού" }}
          />
        </Stack>
      </AppSafeArea>
    </AppProviders>
  );
}
