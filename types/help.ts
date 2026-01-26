import type { IconName } from "@/types/home";

export type OnlineHelpButtonVariant = "icon" | "pill";
export type OnlineHelpButtonTone = "default" | "inverse";

export type OnlineHelpButtonProps = {
  onPress: () => void;
  variant?: OnlineHelpButtonVariant;
  tone?: OnlineHelpButtonTone;
  label?: string;
  accessibilityLabel?: string;
};

export type HelpQuickAction = {
  id: string;
  title: string;
  description: string;
  iconName: IconName;
};

export type HelpContactItem = {
  id: string;
  label: string;
  description: string;
  iconName: IconName;
};

export type HelpContent = {
  title: string;
  subtitle: string;
  quickActionsTitle: string;
  quickActions: HelpQuickAction[];
  guidanceTitle: string;
  guidance: string[];
  contactTitle: string;
  contacts: HelpContactItem[];
};

export type HelpStyleProps = {
  textColor: string;
  mutedTextColor: string;
  borderColor: string;
  surfaceColor: string;
  surfaceMutedColor: string;
  tintColor: string;
};
