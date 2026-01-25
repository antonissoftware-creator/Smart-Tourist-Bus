import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  FlatList,
  type ListRenderItem,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import { CAFE_CATEGORIES, CAFE_ITEMS } from "@/constants/cafe-menu";
import { useThemeColor } from "@/hooks/use-theme-color";
import type {
  CafeCart,
  CafeCartEntry,
  CafeCategoryId,
  CafeCheckoutStep,
  CafeItem,
  CafePaymentMethod,
} from "@/types/cafe";

const SERVICE_FEE = 0.5;

const formatPrice = (value: number) => `€${value.toFixed(2)}`;

const renderCartItemPrice = (price: number, quantity: number) =>
  formatPrice(price * quantity);

export default function PassengerCafeOrders() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const surfaceColor = useThemeColor({}, "surface");
  const surfaceMutedColor = useThemeColor({}, "surfaceMuted");
  const iconColor = useThemeColor({}, "icon");

  const styles = useMemo(
    () =>
      createStyles({
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
    ],
  );

  const columns = useMemo(() => {
    if (width >= 1200) {
      return 5;
    }
    if (width >= 980) {
      return 4;
    }
    if (width >= 720) {
      return 3;
    }
    return 2;
  }, [width]);
  const cardWidth = useMemo(() => {
    const horizontalPadding = 20;
    const columnGap = 16;
    return (
      (width - horizontalPadding * 2 - columnGap * (columns - 1)) / columns
    );
  }, [columns, width]);

  const [selectedCategoryId, setSelectedCategoryId] =
    useState<CafeCategoryId>("coffee");
  const [cart, setCart] = useState<CafeCart>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CafeCheckoutStep>("basket");
  const [customerName, setCustomerName] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<CafePaymentMethod>("card");
  const orderNumberRef = useRef("");

  const itemLookup = useMemo(() => {
    const map = new Map<string, CafeItem>();
    CAFE_ITEMS.forEach((item) => {
      map.set(item.id, item);
    });
    return map;
  }, []);

  const filteredItems = useMemo(
    () => CAFE_ITEMS.filter((item) => item.categoryId === selectedCategoryId),
    [selectedCategoryId],
  );

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map((entry) => {
        const [itemId, quantity] = entry;
        const item = itemLookup.get(itemId);
        if (!item) {
          return null;
        }
        return { item, quantity };
      })
      .filter((entry): entry is CafeCartEntry => Boolean(entry));
  }, [cart, itemLookup]);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((total, quantity) => total + quantity, 0),
    [cart],
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, entry) => total + entry.item.price * entry.quantity,
        0,
      ),
    [cartItems],
  );
  const total = subtotal + (subtotal > 0 ? SERVICE_FEE : 0);

  const addToCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? 0) + 1,
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const current = prev[itemId] ?? 0;
      if (current <= 1) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  const openBasket = () => {
    setCheckoutStep("basket");
    setIsCartOpen(true);
  };

  const proceedToCheckout = () => {
    setCheckoutStep("checkout");
  };

  const placeOrder = () => {
    orderNumberRef.current = `#${Math.floor(1000 + Math.random() * 9000)}`;
    setCheckoutStep("success");
  };

  const resetOrder = () => {
    setCart({});
    setCustomerName("");
    setSeatNumber("");
    setNotes("");
    setPaymentMethod("card");
    setCheckoutStep("basket");
    setIsCartOpen(false);
  };

  const renderItem: ListRenderItem<CafeItem> = ({ item }) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={styles.cardImageWrapper}>
        <Image
          source={item.image}
          style={styles.cardImage}
          contentFit="cover"
        />
        <View style={styles.ratingBadge}>
          <MaterialCommunityIcons name="star" size={12} color={tintColor} />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => addToCart(item.id)}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
        >
          <MaterialCommunityIcons name="plus" size={18} color={surfaceColor} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList<CafeItem>
        key={columns}
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={columns}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.toolbar}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryRow}
            >
              {CAFE_CATEGORIES.map((category) => {
                const isActive = category.id === selectedCategoryId;
                return (
                  <Pressable
                    key={category.id}
                    accessibilityRole="button"
                    onPress={() => setSelectedCategoryId(category.id)}
                    style={({ pressed }) => [
                      styles.categoryChip,
                      isActive && styles.categoryChipActive,
                      pressed && styles.categoryChipPressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isActive && styles.categoryTextActive,
                      ]}
                    >
                      {category.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <Pressable
              accessibilityRole="button"
              onPress={openBasket}
              style={({ pressed }) => [
                styles.cartButton,
                pressed && styles.cartButtonPressed,
              ]}
            >
              <Text style={styles.cartText}>Καλάθι</Text>
              <MaterialCommunityIcons
                name="cart-outline"
                size={18}
                color={textColor}
              />
              {cartCount > 0 ? (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              ) : null}
            </Pressable>
          </View>
        }
      />

      <Modal transparent visible={isCartOpen} animationType="slide">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsCartOpen(false)}
        />
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {checkoutStep === "basket" && "Το καλάθι σου"}
              {checkoutStep === "checkout" && "Στοιχεία Παραγγελίας"}
              {checkoutStep === "success" && "Η παραγγελία στάλθηκε"}
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setIsCartOpen(false)}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed,
              ]}
            >
              <MaterialCommunityIcons
                name="close"
                size={18}
                color={iconColor}
              />
            </Pressable>
          </View>

          {checkoutStep === "basket" && (
            <ScrollView contentContainerStyle={styles.modalContent}>
              {cartItems.length === 0 ? (
                <View style={styles.emptyState}>
                  <MaterialCommunityIcons
                    name="coffee-outline"
                    size={32}
                    color={iconColor}
                  />
                  <Text style={styles.emptyTitle}>
                    Το καλάθι σου είναι άδειο
                  </Text>
                  <Text style={styles.emptySubtitle}>
                    Διάλεξε κάτι από το μενού για να ξεκινήσεις.
                  </Text>
                </View>
              ) : (
                cartItems.map((entry) => (
                  <View key={entry.item.id} style={styles.cartRow}>
                    <Image
                      source={entry.item.image}
                      style={styles.cartImage}
                      contentFit="cover"
                    />
                    <View style={styles.cartInfo}>
                      <Text style={styles.cartItemTitle}>
                        {entry.item.name}
                      </Text>
                      <Text style={styles.cartItemSubtitle}>
                        {renderCartItemPrice(entry.item.price, entry.quantity)}
                      </Text>
                    </View>
                    <View style={styles.cartActions}>
                      <Pressable
                        accessibilityRole="button"
                        onPress={() => removeFromCart(entry.item.id)}
                        style={({ pressed }) => [
                          styles.qtyButton,
                          pressed && styles.qtyButtonPressed,
                        ]}
                      >
                        <MaterialCommunityIcons
                          name="minus"
                          size={14}
                          color={textColor}
                        />
                      </Pressable>
                      <Text style={styles.qtyText}>{entry.quantity}</Text>
                      <Pressable
                        accessibilityRole="button"
                        onPress={() => addToCart(entry.item.id)}
                        style={({ pressed }) => [
                          styles.qtyButton,
                          pressed && styles.qtyButtonPressed,
                        ]}
                      >
                        <MaterialCommunityIcons
                          name="plus"
                          size={14}
                          color={textColor}
                        />
                      </Pressable>
                    </View>
                  </View>
                ))
              )}
              {cartItems.length > 0 ? (
                <View style={styles.summary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Υποσύνολο</Text>
                    <Text style={styles.summaryValue}>
                      {formatPrice(subtotal)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Service</Text>
                    <Text style={styles.summaryValue}>
                      {formatPrice(SERVICE_FEE)}
                    </Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryTotalLabel}>Σύνολο</Text>
                    <Text style={styles.summaryTotalValue}>
                      {formatPrice(total)}
                    </Text>
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    onPress={proceedToCheckout}
                    style={({ pressed }) => [
                      styles.primaryButton,
                      pressed && styles.primaryButtonPressed,
                    ]}
                  >
                    <Text style={styles.primaryButtonText}>
                      Συνέχεια στο Checkout
                    </Text>
                  </Pressable>
                </View>
              ) : null}
            </ScrollView>
          )}

          {checkoutStep === "checkout" && (
            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.formRow}>
                <Text style={styles.inputLabel}>Ονοματεπώνυμο</Text>
                <TextInput
                  placeholder="Π.χ. Γιώργος Παπαδόπουλος"
                  value={customerName}
                  onChangeText={setCustomerName}
                  placeholderTextColor={mutedTextColor}
                  style={styles.input}
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.inputLabel}>Θέση</Text>
                <TextInput
                  placeholder="Π.χ. 12B"
                  value={seatNumber}
                  onChangeText={setSeatNumber}
                  placeholderTextColor={mutedTextColor}
                  style={styles.input}
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.inputLabel}>Σημειώσεις</Text>
                <TextInput
                  placeholder="Π.χ. Χωρίς ζάχαρη"
                  value={notes}
                  onChangeText={setNotes}
                  placeholderTextColor={mutedTextColor}
                  multiline
                  style={[styles.input, styles.textArea]}
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.inputLabel}>Τρόπος Πληρωμής</Text>
                <View style={styles.paymentRow}>
                  {[{ id: "card", label: "Κάρτα" }].map((method) => {
                    const isActive = paymentMethod === method.id;
                    return (
                      <Pressable
                        key={method.id}
                        accessibilityRole="button"
                        onPress={() =>
                          setPaymentMethod(method.id as CafePaymentMethod)
                        }
                        style={({ pressed }) => [
                          styles.paymentChip,
                          isActive && styles.paymentChipActive,
                          pressed && styles.paymentChipPressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.paymentText,
                            isActive && styles.paymentTextActive,
                          ]}
                        >
                          {method.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
              <View style={styles.summary}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Σύνολο</Text>
                  <Text style={styles.summaryTotalValue}>
                    {formatPrice(total)}
                  </Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  onPress={placeOrder}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.primaryButtonPressed,
                  ]}
                >
                  <Text style={styles.primaryButtonText}>
                    Ολοκλήρωση Παραγγελίας
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setCheckoutStep("basket")}
                  style={({ pressed }) => [
                    styles.secondaryButton,
                    pressed && styles.secondaryButtonPressed,
                  ]}
                >
                  <Text style={styles.secondaryButtonText}>Πίσω</Text>
                </Pressable>
              </View>
            </ScrollView>
          )}

          {checkoutStep === "success" && (
            <View style={styles.successContent}>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={48}
                color={tintColor}
              />
              <Text style={styles.successTitle}>
                Ευχαριστούμε για την παραγγελία!
              </Text>
              <Text style={styles.successSubtitle}>
                Θα τη λάβεις στη θέση σου σε λίγα λεπτά.
              </Text>
              <View style={styles.successCard}>
                <Text style={styles.successLabel}>Αριθμός παραγγελίας</Text>
                <Text style={styles.successValue}>
                  {orderNumberRef.current}
                </Text>
                <Text style={styles.successMeta}>
                  {customerName || "Επιβάτης"} · {seatNumber || "Θέση"}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={resetOrder}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.primaryButtonPressed,
                ]}
              >
                <Text style={styles.primaryButtonText}>Νέα Παραγγελία</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const createStyles = ({
  backgroundColor,
  textColor,
  mutedTextColor,
  tintColor,
  borderColor,
  surfaceColor,
  surfaceMutedColor,
  iconColor,
}: {
  backgroundColor: string;
  textColor: string;
  mutedTextColor: string;
  tintColor: string;
  borderColor: string;
  surfaceColor: string;
  surfaceMutedColor: string;
  iconColor: string;
}) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: textColor,
      borderBottomWidth: 2,
      borderBottomColor: tintColor,
      gap: 12,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: backgroundColor,
    },
    backButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: surfaceColor,
    },
    backButtonPressed: {
      opacity: 0.8,
    },
    toolbar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 12,
      gap: 16,
    },
    categoryRow: {
      gap: 12,
      paddingRight: 16,
    },
    categoryChip: {
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor,
      backgroundColor: surfaceColor,
    },
    categoryChipActive: {
      backgroundColor: tintColor,
      borderColor: tintColor,
    },
    categoryChipPressed: {
      opacity: 0.85,
    },
    categoryText: {
      fontSize: 14,
      color: textColor,
      fontWeight: "600",
    },
    categoryTextActive: {
      color: surfaceColor,
    },
    cartButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor,
      backgroundColor: surfaceColor,
    },
    cartButtonPressed: {
      opacity: 0.85,
    },
    cartText: {
      fontSize: 14,
      color: textColor,
      fontWeight: "600",
    },
    cartBadge: {
      position: "absolute",
      top: -6,
      right: -6,
      minWidth: 20,
      height: 20,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tintColor,
    },
    cartBadgeText: {
      fontSize: 12,
      color: surfaceColor,
      fontWeight: "700",
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    columnWrapper: {
      gap: 16,
      marginBottom: 16,
    },
    card: {
      backgroundColor: surfaceColor,
      borderRadius: 16,
      borderWidth: 1,
      borderColor,
      padding: 12,
      gap: 8,
    },
    cardImageWrapper: {
      borderRadius: 12,
      overflow: "hidden",
    },
    cardImage: {
      width: "100%",
      height: 160,
    },
    ratingBadge: {
      position: "absolute",
      top: 8,
      right: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
      backgroundColor: surfaceMutedColor,
    },
    ratingText: {
      fontSize: 11,
      color: mutedTextColor,
      fontWeight: "600",
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: textColor,
    },
    cardSubtitle: {
      fontSize: 12,
      color: mutedTextColor,
    },
    cardFooter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 6,
    },
    cardPrice: {
      fontSize: 16,
      fontWeight: "700",
      color: textColor,
    },
    addButton: {
      width: 34,
      height: 34,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tintColor,
    },
    addButtonPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.97 }],
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: textColor,
      opacity: 0.35,
    },
    modalCard: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      maxHeight: "80%",
      backgroundColor: backgroundColor,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderWidth: 1,
      borderColor,
      paddingBottom: 20,
    },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: textColor,
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: surfaceColor,
    },
    closeButtonPressed: {
      opacity: 0.8,
    },
    modalContent: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      paddingTop: 16,
      gap: 16,
    },
    emptyState: {
      alignItems: "center",
      gap: 8,
      paddingVertical: 20,
    },
    emptyTitle: {
      fontSize: 15,
      fontWeight: "600",
      color: textColor,
    },
    emptySubtitle: {
      fontSize: 13,
      color: mutedTextColor,
      textAlign: "center",
    },
    cartRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 8,
    },
    cartImage: {
      width: 52,
      height: 52,
      borderRadius: 12,
    },
    cartInfo: {
      flex: 1,
      gap: 4,
    },
    cartItemTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: textColor,
    },
    cartItemSubtitle: {
      fontSize: 12,
      color: mutedTextColor,
    },
    cartActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    qtyButton: {
      width: 26,
      height: 26,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor,
      backgroundColor: surfaceColor,
    },
    qtyButtonPressed: {
      opacity: 0.8,
    },
    qtyText: {
      fontSize: 13,
      fontWeight: "600",
      color: textColor,
      width: 20,
      textAlign: "center",
    },
    summary: {
      gap: 12,
      marginTop: 8,
    },
    summaryRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    summaryLabel: {
      fontSize: 13,
      color: mutedTextColor,
    },
    summaryValue: {
      fontSize: 13,
      color: textColor,
      fontWeight: "600",
    },
    summaryDivider: {
      height: 1,
      backgroundColor: borderColor,
    },
    summaryTotalLabel: {
      fontSize: 14,
      fontWeight: "700",
      color: textColor,
    },
    summaryTotalValue: {
      fontSize: 16,
      fontWeight: "700",
      color: textColor,
    },
    primaryButton: {
      marginTop: 8,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
      backgroundColor: tintColor,
    },
    primaryButtonPressed: {
      opacity: 0.9,
    },
    primaryButtonText: {
      fontSize: 14,
      fontWeight: "700",
      color: surfaceColor,
    },
    secondaryButton: {
      paddingVertical: 10,
      borderRadius: 12,
      alignItems: "center",
      borderWidth: 1,
      borderColor,
      backgroundColor: surfaceColor,
    },
    secondaryButtonPressed: {
      opacity: 0.9,
    },
    secondaryButtonText: {
      fontSize: 13,
      fontWeight: "600",
      color: textColor,
    },
    formRow: {
      gap: 8,
    },
    inputLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: textColor,
    },
    input: {
      borderWidth: 1,
      borderColor,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 13,
      color: textColor,
      backgroundColor: surfaceColor,
    },
    textArea: {
      minHeight: 80,
      textAlignVertical: "top",
    },
    paymentRow: {
      flexDirection: "row",
      gap: 12,
      flexWrap: "wrap",
    },
    paymentChip: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor,
      backgroundColor: surfaceColor,
    },
    paymentChipActive: {
      backgroundColor: tintColor,
      borderColor: tintColor,
    },
    paymentChipPressed: {
      opacity: 0.85,
    },
    paymentText: {
      fontSize: 13,
      color: textColor,
      fontWeight: "600",
    },
    paymentTextActive: {
      color: surfaceColor,
    },
    successContent: {
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 20,
      paddingVertical: 24,
    },
    successTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: textColor,
      textAlign: "center",
    },
    successSubtitle: {
      fontSize: 13,
      color: mutedTextColor,
      textAlign: "center",
    },
    successCard: {
      width: "100%",
      alignItems: "center",
      gap: 6,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 14,
      borderWidth: 1,
      borderColor,
      backgroundColor: surfaceColor,
    },
    successLabel: {
      fontSize: 12,
      color: mutedTextColor,
    },
    successValue: {
      fontSize: 20,
      fontWeight: "700",
      color: textColor,
    },
    successMeta: {
      fontSize: 12,
      color: mutedTextColor,
    },
  });
