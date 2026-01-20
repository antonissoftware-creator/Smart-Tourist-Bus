import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppProvidersProps } from "@/types/components";

export function AppProviders({ children }: AppProvidersProps) {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
}
