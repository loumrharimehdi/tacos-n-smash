import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://tacos-n-smash.vercel.app";

export const SITE_NAME = "Tacos & Smash Meknès";
export const DEFAULT_OG_IMAGE = "/images/logo.png";

export const BRAND_KEYWORDS = [
  "tacos meknès",
  "smash burger meknès",
  "livraison tacos meknès",
  "restaurant meknès",
  "original french food meknès",
  "commander tacos meknès",
  "tacos français meknès",
  "french tacos maroc",
  "street food meknès",
];

type BuildMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  keywords,
  noindex,
}: BuildMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const imgUrl = image ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords: keywords ?? BRAND_KEYWORDS,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "fr_FR",
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imgUrl],
    },
    other: {
      "og:type": "restaurant.restaurant",
      "business:contact_data:street_address": "4 Rue El Amal",
      "business:contact_data:locality": "Meknès",
      "business:contact_data:postal_code": "50000",
      "business:contact_data:country_name": "Maroc",
      "business:contact_data:phone_number": "+212535486148",
      "place:location:latitude": "33.8947",
      "place:location:longitude": "-5.5473",
    },
  };
}
