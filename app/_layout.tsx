import { Stack } from "expo-router";

import { AppProviders } from "@/components/AppProviders";
import { AppSafeArea } from "@/components/AppSafeArea";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function RootLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  return (
    <AppProviders>
      <AppSafeArea>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor },
            headerTintColor: textColor,
            headerTitleStyle: { fontWeight: "600", color: textColor },
            contentStyle: { backgroundColor },
          }}
        >
          <Stack.Screen
            name="(tabs)/index"
            options={{ title: "Smart Tourist Bus" }}
          />
          <Stack.Screen
            name="(tabs)/climate-control/index"
            options={{ title: "Climate Control" }}
          />
          <Stack.Screen
            name="(tabs)/driver/index"
            options={{ title: "Driver Console" }}
          />
          <Stack.Screen
            name="(tabs)/driver/assistance"
            options={{ title: "Driver Assistance" }}
          />
          <Stack.Screen
            name="(tabs)/employee-control/index"
            options={{ title: "Employee Control" }}
          />
          <Stack.Screen
            name="(tabs)/energy-dashboard/index"
            options={{ title: "Energy Dashboard" }}
          />
          <Stack.Screen
            name="(tabs)/interactions/index"
            options={{ title: "Rider Interactions" }}
          />
          <Stack.Screen
            name="(tabs)/passenger/index"
            options={{ title: "Passenger Hub" }}
          />
          <Stack.Screen
            name="(tabs)/passenger/nearby-attractions"
            options={{ title: "Nearby Attractions" }}
          />
          <Stack.Screen
            name="(tabs)/passenger/route-view"
            options={{ title: "Route View" }}
          />
          <Stack.Screen
            name="(tabs)/passenger/city-navigation"
            options={{ title: "City Navigation" }}
          />
          <Stack.Screen
            name="(tabs)/passenger/cafe-orders"
            options={{ title: "Cafe Orders" }}
          />
          <Stack.Screen
            name="(tabs)/robot-vacuum/index"
            options={{ title: "Robot Vacuum" }}
          />
        </Stack>
      </AppSafeArea>
    </AppProviders>
  );
}
