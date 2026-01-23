import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useThemeColor } from "@/hooks/use-theme-color";
import type {
  ActionCardItem,
  PlaceCardItem,
  ProductCardItem,
  Tab,
  IconBySetProps,
  MetaDotRowProps,
  ActionCardProps,
  PlaceCardProps,
  ProductCardProps,
  CardRendererProps,
  TabsProps,
  CardTheme,
} from "@/types/cards";

const { width } = Dimensions.get("window");
const CARD_RADIUS = 14;

const TABS: Tab[] = [
  { id: "coffee", label: "Coffee" },
  { id: "drinks", label: "Drinks" },
  { id: "snack", label: "Snack" },
];

const ACTIONS: ActionCardItem[] = [
  {
    type: "action",
    id: "a1",
    title: "Κοντινά αξιοθέατα",
    icon: { set: "mci", name: "binoculars" },
    onPress: () => console.log("Nearby sights"),
  },
  {
    type: "action",
    id: "a2",
    title: "Συνεργαζόμενα εστιατόρια",
    icon: { set: "mci", name: "silverware-fork-knife" },
    onPress: () => console.log("Restaurants"),
  },
  {
    type: "action",
    id: "a3",
    title: "Πλησιέστερη στάση λεωφορείου",
    icon: { set: "mci", name: "bus-stop" },
    onPress: () => console.log("Nearest bus stop"),
  },
];

const PLACES: PlaceCardItem[] = [
  {
    type: "place",
    id: "p1",
    title: "Ακρόπολη",
    imageUrl:
      "https://images.unsplash.com/photo-1544776523-8bdb5f6f1e3a?auto=format&fit=crop&w=1200&q=80",
    metaLeft: "300 μέτρα",
    metaRight: "50 λεπτά",
    onPress: () => console.log("Acropolis"),
  },
  {
    type: "place",
    id: "p2",
    title: "Πλάκα",
    imageUrl:
      "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1200&q=80",
    metaLeft: "700 μέτρα",
    metaRight: "12 λεπτά",
  },
];

const PRODUCTS: ProductCardItem[] = [
  {
    type: "product",
    id: "m1",
    categoryId: "coffee",
    title: "Freddo Espresso",
    description: "Δυνατός, κρύος espresso",
    price: "€3.50",
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
    onAdd: () => console.log("Add freddo espresso"),
  },
  {
    type: "product",
    id: "m2",
    categoryId: "coffee",
    title: "Freddo Cappuccino",
    description: "Κρύος καφές με αφρόγαλα",
    price: "€4.00",
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
    onAdd: () => console.log("Add freddo cappuccino"),
  },
  {
    type: "product",
    id: "m3",
    categoryId: "drinks",
    title: "Sparkling Water",
    description: "Ανθρακούχο νερό 330ml",
    price: "€2.00",
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
    onAdd: () => console.log("Add water"),
  },
];

const createStyles = (theme: CardTheme) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: theme.backgroundColor },
    container: { padding: 18, paddingBottom: 30 },

    h1: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.textColor,
    },

    divider: {
      height: 1,
      backgroundColor: theme.borderColor,
      marginVertical: 18,
    },

    pressed: { opacity: 0.85 },

    /** Action cards */
    actionList: { gap: 14 },
    card: {
      borderRadius: CARD_RADIUS,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.surfaceColor,
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    actionIconWrap: {
      width: 64,
      height: 64,
      borderRadius: 18,
      backgroundColor: theme.surfaceMutedColor,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
    actionTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textColor,
      textAlign: "center",
    },

    /** Map mock */
    mapMock: {
      height: 240,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.surfaceMutedColor,
      alignItems: "center",
      justifyContent: "center",
    },
    mapMockText: {
      fontSize: 28,
      fontWeight: "900",
      color: theme.textColor,
      letterSpacing: 2,
    },

    /** Place cards */
    placeCard: {
      width: Math.min(320, width * 0.72),
      borderRadius: CARD_RADIUS,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.surfaceColor,
      overflow: "hidden",
    },
    placeImage: { width: "100%", height: 120 },
    placeBody: { padding: 12 },
    placeTitle: { fontSize: 14, fontWeight: "800", color: theme.textColor },

    metaRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
    metaText: { fontSize: 12, color: theme.mutedTextColor, fontWeight: "600" },
    metaDot: { marginHorizontal: 6, color: theme.iconColor, fontWeight: "900" },

    /** Tabs */
    tabsRow: { flexDirection: "row", gap: 10 },
    tab: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.surfaceColor,
    },
    tabActive: {
      backgroundColor: theme.tintColor,
      borderColor: theme.tintColor,
    },
    tabText: { fontWeight: "700", color: theme.textColor },
    tabTextActive: { color: theme.backgroundColor },

    /** Product cards */
    productCard: {
      borderRadius: CARD_RADIUS,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.surfaceColor,
      overflow: "hidden",
    },
    productImageWrap: { position: "relative" },
    productImage: { width: "100%", height: 120 },

    ratingPill: {
      position: "absolute",
      right: 10,
      top: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: theme.surfaceColor,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    ratingText: { fontWeight: "800", color: theme.textColor, fontSize: 12 },

    productBody: { padding: 12 },
    productTitle: { fontSize: 15, fontWeight: "900", color: theme.textColor },
    productDesc: {
      marginTop: 6,
      fontSize: 12,
      color: theme.mutedTextColor,
      fontWeight: "600",
    },

    productFooter: {
      marginTop: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    productPrice: { fontSize: 16, fontWeight: "900", color: theme.textColor },

    addBtn: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: theme.tintColor,
      alignItems: "center",
      justifyContent: "center",
    },
    addBtnPressed: { opacity: 0.9 },
  });

export default function DynamicCardsScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const surfaceColor = useThemeColor({}, "surface");
  const surfaceMutedColor = useThemeColor({}, "surfaceMuted");
  const iconColor = useThemeColor({}, "icon");

  const theme = useMemo<CardTheme>(
    () => ({
      backgroundColor,
      textColor,
      mutedTextColor,
      tintColor,
      borderColor,
      surfaceColor,
      surfaceMutedColor,
      iconColor,
    }),
    [
      backgroundColor,
      textColor,
      mutedTextColor,
      tintColor,
      borderColor,
      surfaceColor,
      surfaceMutedColor,
      iconColor,
    ]
  );

  const styles = useMemo(() => createStyles(theme), [theme]);
  const [activeTab, setActiveTab] = useState<string>(TABS[0].id);

  const filteredProducts = useMemo(
    () => PRODUCTS.filter((product) => product.categoryId === activeTab),
    [activeTab]
  );

  const IconBySet = ({ set, name, size = 34, color = iconColor }: IconBySetProps) => {
    if (set === "ion") {
      return <Ionicons name={name as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
    }
    return (
      <MaterialCommunityIcons
        name={name as keyof typeof MaterialCommunityIcons.glyphMap}
        size={size}
        color={color}
      />
    );
  };

  const MetaDotRow = ({ left, right }: MetaDotRowProps) => {
    if (!left && !right) return null;
    return (
      <View style={styles.metaRow}>
        {left ? <Text style={styles.metaText}>{left}</Text> : null}
        {left && right ? <Text style={styles.metaDot}>•</Text> : null}
        {right ? <Text style={styles.metaText}>{right}</Text> : null}
      </View>
    );
  };

  const ActionCard = ({ item }: ActionCardProps) => (
    <Pressable onPress={item.onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.actionIconWrap}>
        <IconBySet {...item.icon} />
      </View>
      <Text style={styles.actionTitle}>{item.title}</Text>
    </Pressable>
  );

  const PlaceCard = ({ item }: PlaceCardProps) => (
    <Pressable
      onPress={item.onPress}
      style={({ pressed }) => [styles.placeCard, pressed && styles.pressed]}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.placeImage} />
      <View style={styles.placeBody}>
        <Text numberOfLines={1} style={styles.placeTitle}>
          {item.title}
        </Text>
        <MetaDotRow left={item.metaLeft} right={item.metaRight} />
      </View>
    </Pressable>
  );

  const ProductCard = ({ item }: ProductCardProps) => (
    <Pressable
      onPress={item.onPress}
      style={({ pressed }) => [styles.productCard, pressed && styles.pressed]}
    >
      <View style={styles.productImageWrap}>
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        {typeof item.rating === "number" ? (
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={12} color={textColor} />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.productBody}>
        <Text numberOfLines={1} style={styles.productTitle}>
          {item.title}
        </Text>
        {item.description ? (
          <Text numberOfLines={2} style={styles.productDesc}>
            {item.description}
          </Text>
        ) : null}

        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <Pressable
            onPress={item.onAdd}
            style={({ pressed }) => [styles.addBtn, pressed && styles.addBtnPressed]}
          >
            <Ionicons name="add" size={18} color={backgroundColor} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  const CardRenderer = ({ item }: CardRendererProps) => {
    switch (item.type) {
      case "action":
        return <ActionCard item={item} />;
      case "place":
        return <PlaceCard item={item} />;
      case "product":
        return <ProductCard item={item} />;
      default:
        return null;
    }
  };

  const Tabs = ({ tabs, activeId, onChange }: TabsProps) => (
    <View style={styles.tabsRow}>
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={({ pressed }) => [
              styles.tab,
              active && styles.tabActive,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>Εξερεύνησε τη στάση σου</Text>
        <View style={{ height: 12 }} />
        <View style={styles.actionList}>
          {ACTIONS.map((action) => (
            <CardRenderer key={action.id} item={action} />
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.h1}>Τι βρίσκεται γύρο μου</Text>
        <View style={{ height: 12 }} />

        <View style={styles.mapMock}>
          <Text style={styles.mapMockText}>MAP</Text>
        </View>

        <View style={{ height: 14 }} />

        <FlatList
          data={PLACES}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 14, paddingRight: 8 }}
          renderItem={({ item }) => <CardRenderer item={item} />}
        />

        <View style={styles.divider} />

        <Text style={styles.h1}>Παραγγελία Ροφήματος</Text>
        <View style={{ height: 12 }} />

        <Tabs tabs={TABS} activeId={activeTab} onChange={setActiveTab} />

        <View style={{ height: 12 }} />

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 14, paddingBottom: 20 }}
          renderItem={({ item }) => <CardRenderer item={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
