import { LucideProps } from "lucide-react";
import { ParserBuilder, SetValues } from "nuqs";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type FilterType = {
  type?: "buy" | "rent";
  property?: string;
  city?: string;
  district?: string;
  price?: string;
  view?: string;
  bedroom?: string;
  bathroom?: string;
  garden?: boolean;
  pool?: boolean;
  furnished?: boolean;
  terrance?: boolean;
  gym?: boolean;
  generator?: boolean;
  heating?: boolean;
  security?: boolean;
  active?: number;
  filter?: string;
  pageIndex?: number;
};

export type Option = {
  id: string;
  value: string;
  label: string;
  icon: string;
  translate: string;
};

export type NavIdType =
  | "navmenu1"
  | "navmenu2"
  | "navmenu3"
  | "navmenu4"
  | "navmenu5"
  | "navmenu6";
export type SideIdType =
  | "sidemenu1"
  | "sidemenu2"
  | "sidemenu3"
  | "sidemenu4"
  | "sidemenu5"
  | "sidemenu6";
export type FilterIdType = "property" | "price" | "more";
export type PropoertyIdType =
  | "property1"
  | "property2"
  | "property3"
  | "property4"
  | "property5"
  | "property6";

export type TotalPropertyIdType =
  | "property1"
  | "property2"
  | "property3"
  | "property4"
  | "property5"
  | "property6"
  | "property7";

export type CriteriaIdType =
  | "garden"
  | "furnished"
  | "pool"
  | "terrace"
  | "gym"
  | "generator";
export type ViewType =
  | "vue_dégagée"
  | "vue_mer"
  | "vue_végétation"
  | "vue_ville";
export type PropertiesNameType =
  | "villa"
  | "apartment"
  | "office"
  | "commercialspace"
  | "land"
  | "warehouse";

type NavmenuType = {
  id: NavIdType;
  title: string;
  url: string;
};

type SideMenuType = {
  id: SideIdType;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  url: string;
};

export type SiteConfigType = {
  navmenu: NavmenuType[];
  sidemenu: SideMenuType[];
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
};

export type CityType = {
  id: string;
  name: string;
};

export type OptionType = {
  id: string;
  icon: string;
  name: string;
  translate: string;
};

export type AreaType = {
  id: string;
  city: string;
  name: string;
};

export type RealStateCategoriesType = {
  villa: number;
  apartment: number;
  office: number;
  commercial: number;
  land: number;
  warehouse: number;
};

export type RealStateDisponibilityType = {
  data: RealStateType[];
};

export type RealStateLocationType = {
  locations: {
    area: string;
  }[];
  areas: {
    _count: { area: number };
    area: string;
    randomImage: string;
  }[];
};

export type RealStateType = {
  id: string;
  images: string[];
  online: boolean;
  title: string;
  dimension: string;
  status: string;
  property: string;
  bedroom: string;
  bathroom: string;
  room: string;
  view: string;
  city: string;
  area: string;
  price: string;
  email: string;
  phone: string;
  whatsapp: string;
  description: string;
  translate: string;
  position: string[];
  options: OptionType[];
  furnished: boolean;
  equippedKitchen: boolean;
  terrace: boolean;
  security: boolean;
  pmr: boolean;
  elevator: boolean;
  pool: boolean;
  internet: boolean;
  gym: boolean;
  garden: boolean;
  generator: boolean;
  parking: boolean;
  clim: boolean;

  updatedAt: Date;
  createdAt: Date;
};

export type GoogleReviewType = {
  author_name: string,
  author_url: string,
  profile_photo_url: string,
  rating: number,
  relative_time_description: string,
  text: string,
  time: number,
  translated: boolean
}

export type DataEditNuqsFilterType = SetValues<{
  pageIndex: Omit<ParserBuilder<number>, "parseServerSide"> & {
    readonly defaultValue: number;
    parseServerSide(value: string | string[] | undefined): number;
  };
  pageSize: Omit<ParserBuilder<number>, "parseServerSide"> & {
    readonly defaultValue: number;
    parseServerSide(value: string | string[] | undefined): number;
  };
  search: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
}>;

export type RealStateEditNuqsFilterType = SetValues<{
  pageIndex: Omit<ParserBuilder<number>, "parseServerSide"> & {
    readonly defaultValue: number;
    parseServerSide(value: string | string[] | undefined): number;
  };
  pageSize: Omit<ParserBuilder<number>, "parseServerSide"> & {
    readonly defaultValue: number;
    parseServerSide(value: string | string[] | undefined): number;
  };
  search: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  city: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  area: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  property: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  status: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  bedroom: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  bathroom: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  price: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  view: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  garden: Omit<ParserBuilder<boolean | null>, "parseServerSide"> & {
    readonly defaultValue: boolean | null;
    parseServerSide(value: string | string[] | undefined): boolean | null;
  };
  furnished: Omit<ParserBuilder<boolean | null>, "parseServerSide"> & {
    readonly defaultValue: boolean | null;
    parseServerSide(value: string | string[] | undefined): boolean | null;
  };
  pool: Omit<ParserBuilder<boolean | null>, "parseServerSide"> & {
    readonly defaultValue: boolean | null;
    parseServerSide(value: string | string[] | undefined): boolean | null;
  };
  generator: Omit<ParserBuilder<boolean | null>, "parseServerSide"> & {
    readonly defaultValue: boolean | null;
    parseServerSide(value: string | string[] | undefined): boolean | null;
  };
  gym: Omit<ParserBuilder<boolean | null>, "parseServerSide"> & {
    readonly defaultValue: boolean | null;
    parseServerSide(value: string | string[] | undefined): boolean | null;
  };
  terrace: Omit<ParserBuilder<boolean | null>, "parseServerSide"> & {
    readonly defaultValue: boolean | null;
    parseServerSide(value: string | string[] | undefined): boolean | null;
  };
}>;

export type SearchEditNuqsFilterType = SetValues<{
  pageIndex: Omit<ParserBuilder<number>, "parseServerSide"> & {
    readonly defaultValue: number;
    parseServerSide(value: string | string[] | undefined): number;
  };
  pageSize: Omit<ParserBuilder<number>, "parseServerSide"> & {
    readonly defaultValue: number;
    parseServerSide(value: string | string[] | undefined): number;
  };
  city: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  area: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  property: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  status: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  bedroom: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  bathroom: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  price: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  view: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  filter: Omit<ParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
  garden: Omit<ParserBuilder<boolean | null>, "parseServerSide"> & {
    readonly defaultValue: boolean | null;
    parseServerSide(value: string | string[] | undefined): boolean | null;
  };
  furnished: Omit<ParserBuilder<boolean | null>, "parseServerSide"> & {
    readonly defaultValue: boolean | null;
    parseServerSide(value: string | string[] | undefined): boolean | null;
  };
  pool: Omit<ParserBuilder<boolean | null>, "parseServerSide"> & {
    readonly defaultValue: boolean | null;
    parseServerSide(value: string | string[] | undefined): boolean | null;
  };
  generator: Omit<ParserBuilder<boolean | null>, "parseServerSide"> & {
    readonly defaultValue: boolean | null;
    parseServerSide(value: string | string[] | undefined): boolean | null;
  };
  gym: Omit<ParserBuilder<boolean | null>, "parseServerSide"> & {
    readonly defaultValue: boolean | null;
    parseServerSide(value: string | string[] | undefined): boolean | null;
  };
  terrace: Omit<ParserBuilder<boolean | null>, "parseServerSide"> & {
    readonly defaultValue: boolean | null;
    parseServerSide(value: string | string[] | undefined): boolean | null;
  };
  active: Omit<ParserBuilder<number>, "parseServerSide"> & {
    readonly defaultValue: number;
    parseServerSide(value: string | string[] | undefined): number;
  };
}>;

export type DataNuqsFilterType = {
  pageIndex: number;
  pageSize: number;
  search: string;
};

export type HouseFilterType = {
  page: number;
  pageSize: number;
  city?: string | null;
  district?: string | null;
  property?: string | null;
  view?: string | null;
  bedroom?: string | null;
  bathroom?: string | null;
  price?: string | null;
  garden?: boolean | null;
  furnished?: boolean | null;
  pool?: boolean | null;
  generator?: boolean | null;
  gym?: boolean | null;
  terrace?: boolean | null;
  filter?: string | null;
};

export type SearchNuqsFilterType = {
  pageIndex: number;
  pageSize: number;
  city: string;
  area: string;
  property: string;
  status: string;
  bedroom: string;
  view: string;
  filter: string;
  bathroom: string;
  price: string;
  garden: boolean | null;
  furnished: boolean | null;
  pool: boolean | null;
  generator: boolean | null;
  gym: boolean | null;
  terrace: boolean | null;
  active: number;
};
export type RealStateNuqsFilterType = {
  pageIndex: number;
  pageSize: number;
  search: string;
  city: string;
  area: string;
  property: string;
  status: string;
  bedroom: string;
  bathroom: string;
  price: string;
  view: string;
  garden: boolean | null;
  furnished: boolean | null;
  pool: boolean | null;
  generator: boolean | null;
  gym: boolean | null;
  terrace: boolean | null;
};

export interface FilterState {
  search?: string;
  city?: string;
  area?: string;
  property?: string;
  category?: string;
  bathroom?: string;
  bedroom?: string;
  price?: string;
  view?: string;
  criteria: {
    furnished?: boolean;
    garden?: boolean;
    pool?: boolean;
    terrace?: boolean;
    gym?: boolean;
    generator?: boolean;
  };
}

export type PaginationType = {
  pageIndex: number;
  pageSize: number;
};

export type TablePaginationType = {
  pageIndex: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type RequestResponse<T> = {
  message: string;
  state: "error" | "success";
  data?: T;
  total?: number;
  totalPages?: number;
  all?: number;
};

export type QueryResponse = {
  message: string;
  state: "error" | "success";
  data?: unknown;
  total?: number;
  all?: number;
};

export type FiltersType = {
  areas: AreaType[];
  cities: CityType[];
};

export type PlaceType = {
  id: number;
  label: string;
  value: string;
};

export type ClientPlaceType = {
  id: string;
  content: string;
};
