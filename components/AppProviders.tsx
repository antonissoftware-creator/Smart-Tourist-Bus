import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "@/components/AuthProvider";
import { AppProvidersProps } from "@/types/components";

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SafeAreaProvider>
      <AuthProvider>{children}</AuthProvider>
    </SafeAreaProvider>
  );
}
