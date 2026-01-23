import type { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Href } from "expo-router";

export type HomeCardStyleProps = {
  textColor: string;
  mutedTextColor: string;
  tintColor: string;
  borderColor: string;
  surfaceColor: string;
  surfaceMutedColor: string;
};

export type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];


export type HomeSampleCard = {
  id: string;
  title: string;
  description: string;
  tag: string;
  iconName: IconName;
  route?: Href;
};
