export type CafeCategoryId = "coffee" | "drinks" | "snack";

export interface CafeCategory {
  id: CafeCategoryId;
  label: string;
}

import type { ImageSourcePropType } from "react-native";

export interface CafeItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: ImageSourcePropType;
  categoryId: CafeCategoryId;
}

export interface CafeCartEntry {
  item: CafeItem;
  quantity: number;
}

export type CafeCart = Record<string, number>;

export type CafeCheckoutStep = "basket" | "checkout" | "success";

export type CafePaymentMethod = "card" | "cash";
