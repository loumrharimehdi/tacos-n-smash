import { SITE_URL } from "@/lib/seo";

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: "Tacos & Smash",
  alternateName: "Tacos and Smash Meknès",
  description:
    "Restaurant de tacos français et smash burgers à Meknès. Original French Food. ⭐ 4,8/5 sur Google. Livraison, à emporter, sur place.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: [
    `${SITE_URL}/images/tacos-mythique.webp`,
    `${SITE_URL}/images/burger-original-smash.webp`,
    `${SITE_URL}/images/tacos-chevre-miel.webp`,
  ],
  telephone: "+212535486148",
  email: "",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4 Rue El Amal",
    addressLocality: "Meknès",
    postalCode: "50000",
    addressCountry: "MA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.8947,
    longitude: -5.5473,
  },
  servesCuisine: [
    "French Street Food",
    "Tacos",
    "Smash Burgers",
    "Fast Food",
  ],
  priceRange: "MAD 35-130",
  currenciesAccepted: "MAD",
  paymentAccepted: ["Cash"],
  acceptsReservations: false,
  hasMenu: `${SITE_URL}/menu`,
  menu: `${SITE_URL}/menu`,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:00",
      closes: "00:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "220",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.instagram.com/tacosnsmash/",
    "https://www.facebook.com/tacosnsmash",
    "https://glovoapp.com/ma/fr/meknes/tacos-and-smash-mks/",
  ],
  potentialAction: {
    "@type": "OrderAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://wa.me/212678630651",
      inLanguage: "fr-FR",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModeOwnFleet"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Tacos & Smash Meknès",
  inLanguage: "fr-FR",
  publisher: { "@id": `${SITE_URL}/#restaurant` },
};

export function RestaurantJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
