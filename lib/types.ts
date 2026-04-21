export type Category =
  | "tacos-signature"
  | "smash"
  | "supplements"
  | "menu-family"
  | "menu-enfant"
  | "desserts"
  | "boissons";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  emoji?: string;
  category: Category;
  badge?: string;
};

export type TacosSize = "simple" | "double" | "triple";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  emoji?: string;
  options?: string;
};

export type OrderMode = "livraison" | "surplace";

export type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  mode: OrderMode;
  notes?: string;
  total: number;
  items: CartItem[];
  createdAt: string;
};
