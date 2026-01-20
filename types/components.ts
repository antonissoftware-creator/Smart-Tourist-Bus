import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type AppProvidersProps = {
  children: ReactNode;
};

export type AppSafeAreaProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};
