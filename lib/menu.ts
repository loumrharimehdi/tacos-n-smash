import type { MenuItem, TacosSize } from "./types";

export const RESTAURANT = {
  name: "Tacos & Smash",
  tagline: "Original French Food",
  city: "Meknès",
  address: "4 Rue El Amal, Meknès 50000",
  phone: "05 35 48 61 48",
  whatsapp: "+212678630651",
  whatsappDisplay: "+212 678-630651",
  instagram: "https://www.instagram.com/tacosnsmash/",
  facebook: "https://www.facebook.com/tacosnsmash",
  glovo:
    "https://glovoapp.com/ma/fr/meknes/tacos-and-smash-mks/",
  googleRating: 4.8,
  googleReviews: 220,
  glovoSatisfaction: 97,
  hours: "Ouvert jusqu'à minuit — 7j/7",
};

export const TACOS_SIZES: {
  id: TacosSize;
  label: string;
  meats: number;
  price: number;
  image: string;
}[] = [
  { id: "simple", label: "Simple", meats: 1, price: 35, image: "/images/tacos-simple.webp" },
  { id: "double", label: "Double", meats: 2, price: 50, image: "/images/tacos-double.webp" },
  { id: "triple", label: "Triple", meats: 3, price: 65, image: "/images/tacos-triple.webp" },
];

export const TACOS_MEATS: { id: string; label: string; extra: number }[] = [
  { id: "steak", label: "Steak", extra: 5 },
  { id: "poulet", label: "Poulet", extra: 0 },
  { id: "mixte", label: "Mixte", extra: 0 },
  { id: "escalope", label: "Escalope Panée", extra: 2 },
  { id: "kebab", label: "Kebab", extra: 0 },
  { id: "nuggets", label: "Nuggets", extra: 0 },
  { id: "tenders", label: "Tenders", extra: 0 },
  { id: "cordon-bleu", label: "Cordon Bleu", extra: 0 },
];

export const TACOS_SAUCES: { id: string; label: string; heat?: string }[] = [
  { id: "biggy", label: "Biggy" },
  { id: "barbecue", label: "Barbecue" },
  { id: "andalouse", label: "Andalouse" },
  { id: "mayonnaise", label: "Mayonnaise" },
  { id: "blanche", label: "Blanche" },
  { id: "ketchup", label: "Ketchup" },
  { id: "poivre", label: "Poivre" },
  { id: "algerienne", label: "Algérienne", heat: "🌶" },
  { id: "harissa", label: "Harissa", heat: "🌶🌶" },
  { id: "samourai", label: "Samouraï", heat: "🌶🌶" },
  { id: "chily-thai", label: "Chily Thaï", heat: "🌶🌶🌶" },
];

export const MENU: MenuItem[] = [
  // Tacos Signature
  {
    id: "tacos-indien",
    name: "L'Indien",
    description:
      "Tortilla, poulet mariné épices indiennes, frites, sauce fromagère",
    price: 69,
    image: "/images/tacos-indien.webp",
    category: "tacos-signature",
  },
  {
    id: "tacos-bourgeois",
    name: "Le Bourgeois",
    description: "Tortilla, steak haché de bœuf, fromage, frites, sauce fromagère",
    price: 69,
    image: "/images/tacos-bourgeois.webp",
    category: "tacos-signature",
  },
  {
    id: "tacos-chevre-miel",
    name: "Le Chèvre Miel",
    description: "Tortilla, fromage de chèvre, miel, frites, sauce fromagère",
    price: 75,
    image: "/images/tacos-chevre-miel.webp",
    category: "tacos-signature",
    badge: "Premium",
  },
  {
    id: "tacos-boursin",
    name: "Le Boursin",
    description: "Tortilla, fromage boursin, poulet ou steak, frites, sauce fromagère",
    price: 69,
    image: "/images/tacos-boursin.webp",
    category: "tacos-signature",
  },
  {
    id: "tacos-mythique",
    name: "Le Mythique",
    description: "Tortilla, combinaison spéciale de viandes, frites, sauce fromagère",
    price: 69,
    image: "/images/tacos-mythique.webp",
    category: "tacos-signature",
    badge: "Bestseller",
  },
  {
    id: "tacos-parisien",
    name: "Le Parisien",
    description: "Tortilla, jambon de dinde fumé, fromage, frites, sauce fromagère",
    price: 69,
    image: "/images/tacos-parisien.webp",
    category: "tacos-signature",
  },
  // Smash Burgers
  {
    id: "burger-original-smash",
    name: "Original Smash",
    description:
      "Pain brioché, steak smashé, fromage, salade, tomate, oignon, cornichon, sauce maison",
    price: 65,
    image: "/images/burger-original-smash.webp",
    category: "smash",
    badge: "Signature",
  },
  {
    id: "burger-crispy-smash",
    name: "Crispy Smash",
    description:
      "Pain brioché, steak smashé, poulet croustillant pané, fromage, salade, tomate, oignon, cornichon",
    price: 69,
    image: "/images/burger-crispy-smash.webp",
    category: "smash",
  },
  {
    id: "burger-kentucky",
    name: "Le Kentucky",
    description:
      "Pain brioché, steak smashé, poulet façon kentucky épicé, jambon de dinde, fromage, salade, tomate",
    price: 69,
    image: "/images/burger-kentucky.webp",
    category: "smash",
  },
  {
    id: "burger-new-yorkais",
    name: "Le New Yorkais Boursin",
    description:
      "Pain potatoes, steak smashé, sauce boursin ail & fines herbes",
    price: 69,
    image: "/images/burger-new-yorkais.webp",
    category: "smash",
  },
  {
    id: "burger-big-smash",
    name: "Big Smash",
    description:
      "Pain brioché, double steak smashé, double fromage, salade, tomate, oignon, cornichon",
    price: 69,
    image: "/images/burger-big-smash.webp",
    category: "smash",
    badge: "Double",
  },
  {
    id: "burger-rosti-smash",
    name: "Rösti Smash",
    description: "Pain brioché, steak smashé, cheddar, salade, tomate, cornichon",
    price: 69,
    image: "/images/burger-rosti-smash.webp",
    category: "smash",
  },
  // Suppléments
  {
    id: "tenders-big",
    name: "Tenders Big x3",
    price: 52,
    image: "/images/tenders-big.webp",
    category: "supplements",
  },
  {
    id: "cheesy-fries",
    name: "Cheesy Fries",
    price: 35,
    image: "/images/cheesy-fries.webp",
    category: "supplements",
  },
  {
    id: "chicken-nuggets",
    name: "Chicken Nuggets x6",
    price: 25,
    image: "/images/chicken-nuggets.webp",
    category: "supplements",
  },
  {
    id: "onion-rings",
    name: "Onion Rings x4",
    price: 25,
    image: "/images/onion-rings.webp",
    category: "supplements",
  },
  {
    id: "frites",
    name: "Frites",
    price: 15,
    image: "/images/frites.webp",
    category: "supplements",
  },
  {
    id: "stick-sauce",
    name: "Stick sauce Nawel's",
    description: "Algérienne · Biggy · Ketchup · Mayo",
    price: 3,
    image: "/images/supplement-biggy.webp",
    category: "supplements",
  },
  // Menu Family
  {
    id: "mf-tacos",
    name: "MF Tacos",
    description:
      "2 Tacos M + 2 Frites + Boisson 1L + 1 Mini Tacos ou Nuggets + 1 Kinder + 1 Jus",
    price: 110,
    emoji: "👨‍👩‍👧‍👦",
    category: "menu-family",
  },
  {
    id: "mf-smash",
    name: "MF Smash",
    description:
      "2 Smash Original + 2 Frites + Boisson 1L + 1 Mini Tacos ou Nuggets + 1 Kinder + 1 Jus",
    price: 130,
    emoji: "🍔",
    category: "menu-family",
  },
  {
    id: "mf-texmex",
    name: "MF Texmex",
    description:
      "2 Tex Mex + 2 Frites + Boisson 1L + 1 Mini Tacos ou Nuggets + 1 Kinder + 1 Jus",
    price: 100,
    emoji: "🌯",
    category: "menu-family",
  },
  // Menu Enfant
  {
    id: "menu-enfant",
    name: "Menu Enfant",
    description:
      "Mini Tacos OU Mini Cheese OU 4 Nuggets + Frites + Kinder Maxi + Jus",
    price: 30,
    emoji: "👶",
    category: "menu-enfant",
  },
  // Desserts
  {
    id: "dessert-tiramisu",
    name: "Tiramisu",
    price: 18,
    emoji: "🍰",
    category: "desserts",
  },
  {
    id: "dessert-tarte-daim",
    name: "Tarte Daim",
    price: 20,
    emoji: "🥧",
    category: "desserts",
  },
  {
    id: "dessert-donuts",
    name: "Donuts",
    price: 17,
    emoji: "🍩",
    category: "desserts",
  },
  // Boissons
  {
    id: "coca-1l",
    name: "Coca Cola 1L",
    description: "Bouteille",
    price: 15,
    image: "/images/bouteille-coca.webp",
    category: "boissons",
  },
  {
    id: "coca-33",
    name: "Coca Cola 33cl",
    description: "Canette",
    price: 9,
    image: "/images/cannette-coca.webp",
    category: "boissons",
  },
  {
    id: "eau-1-5",
    name: "Ciel eau 1,5L",
    price: 11,
    image: "/images/bouteille-eau.webp",
    category: "boissons",
  },
  {
    id: "eau-33",
    name: "Ciel eau 33cl",
    price: 7,
    image: "/images/cannette-eau.webp",
    category: "boissons",
  },
];

export const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  "tacos-signature": { label: "Tacos Signature", emoji: "🌮" },
  smash: { label: "Smash Burgers", emoji: "🍔" },
  supplements: { label: "Suppléments", emoji: "🍟" },
  "menu-family": { label: "Menu Family", emoji: "👨‍👩‍👧‍👦" },
  "menu-enfant": { label: "Menu Enfant", emoji: "👶" },
  desserts: { label: "Desserts", emoji: "🍰" },
  boissons: { label: "Boissons", emoji: "🥤" },
};

export const CATEGORIES_ORDER = [
  "tacos-signature",
  "smash",
  "supplements",
  "menu-family",
  "menu-enfant",
  "desserts",
  "boissons",
] as const;
