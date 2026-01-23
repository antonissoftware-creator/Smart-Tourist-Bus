export type IconSet = "ion" | "mci";

export type IconSpec = {
  set: IconSet;
  name: string;
};

export type ActionCardItem = {
  type: "action";
  id: string;
  title: string;
  icon: IconSpec;
  onPress?: () => void;
};

export type PlaceCardItem = {
  type: "place";
  id: string;
  title: string;
  imageUrl: string;
  metaLeft?: string;
  metaRight?: string;
  onPress?: () => void;
};

export type ProductCardItem = {
  type: "product";
  id: string;
  title: string;
  description?: string;
  price: string;
  rating?: number;
  imageUrl: string;
  onAdd?: () => void;
  onPress?: () => void;
  categoryId: string;
};

export type CardItem = ActionCardItem | PlaceCardItem | ProductCardItem;

export type Tab = { id: string; label: string };

export type IconBySetProps = IconSpec & { size?: number; color?: string };

export type MetaDotRowProps = {
  left?: string;
  right?: string;
};

export type ActionCardProps = {
  item: ActionCardItem;
};

export type PlaceCardProps = {
  item: PlaceCardItem;
};

export type ProductCardProps = {
  item: ProductCardItem;
};

export type CardRendererProps = {
  item: CardItem;
};

export type TabsProps = {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
};

export type CardTheme = {
  backgroundColor: string;
  textColor: string;
  mutedTextColor: string;
  tintColor: string;
  borderColor: string;
  surfaceColor: string;
  surfaceMutedColor: string;
  iconColor: string;
};
