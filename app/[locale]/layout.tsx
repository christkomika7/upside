import "../globals.css";
import { Toaster } from "sonner";
import { inter } from "@/font/font";
import I18nProvider from "@/components/providers/i18n-provider";
import ZoomLimiter from "@/components/zoom-limiter";
import ReactQueryProvider from "@/context/react-query-provider";
import { NuqsAdapter } from "nuqs/adapters/next";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: "fr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFrench = locale === "fr";

  return {
    metadataBase: new URL("https://upside-gabon.com"),
    title: {
      default: "Upside Gabon",
      template: "Upside Gabon | %s",
    },
    description: isFrench
      ? "Upside Gabon vous accompagne dans l'achat, la location et la gestion de biens à Libreville, offrant expertise locale, service personnalisé et conseils transparents."
      : "Upside Gabon supports you in buying, renting, and managing properties in Libreville with local expertise, personalized service, and transparent advice.",

    keywords: isFrench
      ? [
          "immobilier",
          "app immobilier",
          "application immobilière",
          "annonces immobilières",
          "agence immobilière",
          "achat immobilier",
          "location immobilière",
          "gestion locative",
          "vente de maisons",
          "location d'appartements",
          "propriétés à louer",
          "propriétés à vendre",
          "recherche immobilière",
          "maison à vendre",
          "maison à louer",
          "appartement à vendre",
          "appartement à louer",
          "terrains à vendre",
          "villa à louer",
          "studio à louer",
          "libreville",
          "propriété",
          "bien",
          "maison",
          "location",
          "louer",
          "appartement",
          "gabon",
          "immeuble",
          "terrain",
          "villa",
          "bureau",
          "entrepôt",
          "achat immobilier",
          "location maison",
          "gestion locative",
          "Upside Gabon",
        ]
      : [
          "real estate",
          "real estate app",
          "property application",
          "real estate listings",
          "real estate agency",
          "property purchase",
          "property rental",
          "rental management",
          "house for sale",
          "apartment for rent",
          "properties for rent",
          "properties for sale",
          "property search",
          "home for sale",
          "home for rent",
          "apartment for sale",
          "apartment for rent",
          "land for sale",
          "villa for rent",
          "studio for rent",
          "libreville",
          "property",
          "real estate asset",
          "house",
          "rental",
          "rent",
          "apartment",
          "gabon",
          "building",
          "land",
          "villa",
          "office",
          "warehouse",
          "property purchase",
          "house rental",
          "property management",
          "Upside Gabon",
        ],
    authors: [{ name: "Upside Gabon", url: "https://upside-gabon.com" }],
    creator: "Upside Gabon",
    publisher: "Upside Gabon",

    alternates: {
      canonical: `/${locale}`,
      languages: {
        "fr-FR": "https://upside-gabon.com/fr",
        "en-US": "https://upside-gabon.com/en",
      },
    },

    robots: {
      index: true,
      follow: true,
      nocache: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },

    openGraph: {
      type: "website",
      locale: isFrench ? "fr_FR" : "en_US",
      url: `https://upside-gabon.com/${locale}`,
      title: isFrench ? "Upside Gabon | Accueil" : "Upside Gabon | Home",
      description: isFrench
        ? "Votre partenaire immobilier de confiance à Libreville : achetez, louez ou gérez vos biens facilement en Gabon avec Upside."
        : "Your trusted real estate partner in Libreville: buy, rent, or manage your properties easily in Gabon with Upside.",
      siteName: "Upside Gabon",
      images: [
        {
          url: "https://upside-gabon.com/Logo.png",
          width: 512,
          height: 512,
          alt: "Logo Upside Gabon",
        },
      ],
    },
  };
}

export default async function SubLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <head>
        <meta
          name="google-site-verification"
          content="I9dl0VdV7W0aDjOFS6DpTJw7TvDumpcsjm8_60s6USk"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-title" content="Upside" />
      </head>
      <body className={`${inter.className} antialiased `}>
        <ZoomLimiter />
        <NuqsAdapter>
          <I18nProvider locale={locale}>
            <ReactQueryProvider>
              {children}
              <Toaster />
            </ReactQueryProvider>
          </I18nProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
