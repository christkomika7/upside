import {
  CertifyHouseIcon,
  IconProps,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SecurityHouseIcon,
  SpaciousHouseIcon,
} from "@/components/ui/icon";
import { JSX, SVGProps } from "react";

export type CategoryIdType =
  | "category1"
  | "category2"
  | "category3"
  | "category4"
  | "category5"
  | "category6";
export type TeamIdType =
  | "team1"
  | "team2"
  | "team3"
  | "team4"
  | "team5"
  | "team6";
export type ServiceIdType = "service1" | "service2" | "service3";
export type ClientIdType =
  | "client1"
  | "client2"
  | "client3"
  | "client4"
  | "client5"
  | "client6"
  | "client7"
  | "client8"
  | "client9";
export type HeroServiceIdType = "buy1" | "buy2" | "buy3";
export type OrderTypeIdType = "order1" | "order2" | "order3";
export type ActivityIdType =
  | "activity1"
  | "activity2"
  | "activity3"
  | "activity4"
  | "activity5"
  | "activity6";
export type BenefitIdType =
  | "benefit1"
  | "benefit2"
  | "benefit3"
  | "benefit4"
  | "benefit5"
  | "benefit6"
  | "benefit7"
  | "benefit8";
export type PropertyIdType =
  | "property1"
  | "property2"
  | "property3"
  | "property4"
  | "property5"
  | "property6";
export type CriteriaIdType =
  | "garden"
  | "seaview"
  | "pool"
  | "terrace"
  | "gym"
  | "generator";
export type FilterTranslateIdType =
  | "property"
  | "city"
  | "district"
  | "bedroom"
  | "bathroom"
  | "price";
export type FeatureBadgeListIdType =
  | "bedroom"
  | "bathroom"
  | "furnished"
  | "equippedKitchen"
  | "terrace"
  | "security"
  | "pmr"
  | "elevator"
  | "garden"
  | "pool"
  | "terrace"
  | "gym"
  | "generator"
  | "internet"
  | "parking"
  | "clim";

export type BenefitType = {
  id: BenefitIdType;
  title: string;
  content: string;
};

export type HousePropertiesType = {
  id: string;
  status: "Louer" | "Acheter";
  price: string;
  location: string;
  size: string;
  bed: string;
  bath: string;
  room: string;
  furnished?: boolean;
};

export type ActivityType = {
  id: ActivityIdType;
  img: string;
  title: string;
  content: string;
};

export type CategoryType = {
  id: CategoryIdType;
  img: string;
  title: string;
  content: string;
  url: string;
};

export type TeamType = {
  id: TeamIdType;
  img: string;
  name: string;
  job: string;
  info: string;
};

export type TeamServiceType = {
  id: ServiceIdType;
  title: string;
  content: string;
};


export type HeroService = {
  id: HeroServiceIdType;
  icon: (props: SVGProps<SVGSVGElement> & IconProps) => JSX.Element;
  title: string;
  content: string;
};

export type OrderType = {
  id: OrderTypeIdType;
  content: string;
};

export const categories: CategoryType[] = [
  {
    id: "category1",
    img: "/assets/home/categoories/Subtract 1.png",
    title: "Villa",
    content: "17 properties",
    url: "/",
  },
  {
    id: "category2",
    img: "/assets/home/categoories/Subtract 2.png",
    title: "Apartment",
    content: "17 properties",
    url: "/",
  },
  {
    id: "category3",
    img: "/assets/home/categoories/Subtract 3.jpeg",
    title: "Warehouse",
    content: "17 properties",
    url: "/",
  },
  {
    id: "category4",
    img: "/assets/home/categoories/Subtract 4.png",
    title: "Office",
    content: "17 properties",
    url: "/",
  },
  {
    id: "category5",
    img: "/assets/home/categoories/Subtract 5.png",
    title: "Land",
    content: "17 properties",
    url: "/",
  },
  {
    id: "category6",
    img: "/assets/home/categoories/Subtract 6.png",
    title: "Commercial space",
    content: "17 properties",
    url: "/",
  },
];

export const locations: CategoryType[] = [
  {
    id: "category1",
    img: "/assets/home/locations/Subtract 1.png",
    title: "Pellentesque",
    content: "17 properties",
    url: "/",
  },
  {
    id: "category2",
    img: "/assets/home/locations/Subtract 2.png",
    title: "Pellentesque",
    content: "17 properties",
    url: "/",
  },
  {
    id: "category3",
    img: "/assets/home/locations/Subtract 3.png",
    title: "Pellentesque",
    content: "17 properties",
    url: "/",
  },
  {
    id: "category4",
    img: "/assets/home/locations/Subtract 4.png",
    title: "Pellentesque",
    content: "17 properties",
    url: "/",
  },
];

export const locationFilters = [
  "Massa scelerisque quis",
  "Sollicitudin",
  "Sollicitudin",
  "Sollicitudin",
  "Faucibus non vulputate",
  "Pellentesque",
  "Tincidunt sollicitudin",
  "Sollicitudin",
  "Leo velit pellentesque",
  "Sollicitudin",
  "Pellentesque",
  "Pellentesque",
];

export const teams: TeamType[] = [
  {
    id: "team1",
    img: "/assets/home/teams/team 1.jpeg",
    name: "Cécile Magnée",
    job: "Commercial Director",
    info: "Ralph helps you to find the best offers on the market.",
  },
  {
    id: "team2",
    img: "/assets/home/teams/team 2.jpeg",
    name: "Avelle Kouka",
    job: "Administrative Manager",
    info: "Marie manages your files with precision and transparency.",
  },
  {
    id: "team3",
    img: "/assets/home/teams/team 3.jpeg",
    name: "Yris Lengouma",
    job: "Technical Manager",
    info: "Paul ensures the quick and efficient resolution of technical issues.",
  },
  {
    id: "team4",
    img: "/assets/home/teams/team 4.jpeg",
    name: "Grace Mouyecket",
    job: "Commercial Director",
    info: "Ralph helps you to find the best offers on the market.",
  },
  {
    id: "team5",
    img: "/assets/home/teams/team 5.jpeg",
    name: "Léon Nama",
    job: "Administrative Manager",
    info: "Marie manages your files with precision and transparency.",
  },
  {
    id: "team6",
    img: "/assets/home/teams/team 6.jpeg",
    name: "Lune Likoussou",
    job: "Technical Manager",
    info: "Paul ensures the quick and efficient resolution of technical issues.",
  },
];

export const teamsSlider: TeamType[][] = [
  [
    {
      id: "team1",
      img: "/assets/home/teams/team 1.jpeg",
      name: "Cécile Magnée",
      job: "Commercial Director",
      info: "Ralph helps you to find the best offers on the market.",
    },
    {
      id: "team2",
      img: "/assets/home/teams/team 2.jpeg",
      name: "Avelle Kouka",
      job: "Administrative Manager",
      info: "Marie manages your files with precision and transparency.",
    },
  ],
  [
    {
      id: "team3",
      img: "/assets/home/teams/team 3.jpeg",
      name: "Yris Lengouma",
      job: "Technical Manager",
      info: "Paul ensures the quick and efficient resolution of technical issues.",
    },
    {
      id: "team4",
      img: "/assets/home/teams/team 4.jpeg",
      name: "Grace Mouyecket",
      job: "Commercial Director",
      info: "Ralph helps you to find the best offers on the market.",
    },
  ],
  [
    {
      id: "team5",
      img: "/assets/home/teams/team 5.jpeg",
      name: "Léon Nama",
      job: "Administrative Manager",
      info: "Marie manages your files with precision and transparency.",
    },
    {
      id: "team6",
      img: "/assets/home/teams/team 6.jpeg",
      name: "Lune Likoussou",
      job: "Technical Manager",
      info: "Paul ensures the quick and efficient resolution of technical issues.",
    },
  ],
];

export const teamServices: TeamServiceType[] = [
  {
    id: "service1",
    title: "",
    content: "",
  },
  {
    id: "service2",
    title: "",
    content: "",
  },
  {
    id: "service3",
    title: "",
    content: "",
  },
];

export const orders: OrderType[] = [
  {
    id: "order1",
    content: "Ascending price",
  },
  {
    id: "order2",
    content: "Descending price",
  },
  {
    id: "order3",
    content: "Oldest to newest",
  },
];

export const hero_buy: HeroService[] = [
  {
    id: "buy1",
    icon: SecurityHouseIcon,
    title: "",
    content: "",
  },
  {
    id: "buy2",
    icon: CertifyHouseIcon,
    title: "",
    content: "",
  },
  {
    id: "buy3",
    icon: SpaciousHouseIcon,
    title: "",
    content: "",
  },
];

export const hero_contact: HeroService[] = [
  {
    id: "buy1",
    icon: MailIcon,
    title: "",
    content: "",
  },
  {
    id: "buy2",
    icon: PhoneIcon,
    title: "",
    content: "",
  },
  {
    id: "buy3",
    icon: MapPinIcon,
    title: "",
    content: "",
  },
];

export const hero_contact_export: HeroService[] = [
  {
    id: "buy1",
    icon: MailIcon,
    title: "Contactez-nous",
    content: "info@upside-gabon.com",
  },
  {
    id: "buy2",
    icon: PhoneIcon,
    title: "Appelez-nous / Ecrivez-nous",
    content: "+241 66 48 48 07 / +241 76 48 48 06",
  },
  {
    id: "buy3",
    icon: MapPinIcon,
    title: "Notre adresse",
    content: "La Baie des Rois, Libreville, Gabon",
  },
];

export const activiesList: ActivityType[] = [
  {
    id: "activity1",
    img: "/assets/manaement/track 1.png",
    title: "",
    content: "",
  },
  {
    id: "activity2",
    img: "/assets/manaement/track 2.png",
    title: "",
    content: "",
  },
  {
    id: "activity3",
    img: "/assets/manaement/track 3.png",
    title: "",
    content: "",
  },
  {
    id: "activity4",
    img: "/assets/manaement/track 4.png",
    title: "",
    content: "",
  },
  {
    id: "activity5",
    img: "/assets/manaement/track 5.png",
    title: "",
    content: "",
  },
  {
    id: "activity6",
    img: "/assets/manaement/track 6.png",
    title: "",
    content: "",
  },
];

export const benefits: BenefitType[] = [
  {
    id: "benefit1",
    title: "",
    content: "",
  },
  {
    id: "benefit2",
    title: "",
    content: "",
  },
  {
    id: "benefit3",
    title: "",
    content: "",
  },
  {
    id: "benefit4",
    title: "",
    content: "",
  },
  {
    id: "benefit5",
    title: "",
    content: "",
  },
  {
    id: "benefit6",
    title: "",
    content: "",
  },
  {
    id: "benefit7",
    title: "",
    content: "",
  },
  {
    id: "benefit8",
    title: "",
    content: "",
  },
];
