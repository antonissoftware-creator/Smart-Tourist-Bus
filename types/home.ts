export type HomeCardStyleProps = {
  textColor: string;
  mutedTextColor: string;
  tintColor: string;
  borderColor: string;
  surfaceColor: string;
  surfaceMutedColor: string;
};

import type { Href } from "expo-router";

export type HomeSampleCard = {
  id: string;
  title: string;
  description: string;
  tag: string;
  route?: Href;
};
