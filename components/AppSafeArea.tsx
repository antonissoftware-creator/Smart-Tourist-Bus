import { SafeAreaView } from "react-native-safe-area-context";

import { AppSafeAreaProps } from "@/types/components";
import { useThemeColor } from "@/hooks/use-theme-color";

export function AppSafeArea({ children, style }: AppSafeAreaProps) {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor }, style]}
      edges={["top", "bottom", "left", "right"]}
    >
      {children}
    </SafeAreaView>
  );
}
