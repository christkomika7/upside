import { PropertyIdType } from ".";
import { JSX, SVGProps } from "react";
import {
  ApartmentIcon,
  CommercialIcon,
  IconProps,
  LandIcon,
  OfficeIcon,
  VillaIcon,
  WarehouseIcon,
} from "@/components/ui/icon";
import { TotalPropertyIdType } from "@/lib/type";

export const housePropertiesType: {
  id: PropertyIdType;
  icon: (props: SVGProps<SVGSVGElement> & IconProps) => JSX.Element;
  content: string;
}[] = [
    {
      id: "property1",
      icon: VillaIcon,
      content: "Villa",
    },
    {
      id: "property2",
      icon: ApartmentIcon,
      content: "Apartment",
    },
    {
      id: "property3",
      icon: OfficeIcon,
      content: "Office",
    },
    {
      id: "property4",
      icon: CommercialIcon,
      content: "Commercial Space",
    },
    {
      id: "property5",
      icon: LandIcon,
      content: "Land",
    },
    {
      id: "property6",
      icon: WarehouseIcon,
      content: "Warehouse",
    },
  ];

export const housePropertiesType2: {
  id: TotalPropertyIdType;
  content: string;
}[] = [
    {
      id: "property1",
      content: "Villa",
    },
    {
      id: "property2",
      content: "Apartment",
    },
    {
      id: "property3",
      content: "Office",
    },
    {
      id: "property4",
      content: "Commercial Space",
    },
    {
      id: "property5",
      content: "Land",
    },
    {
      id: "property6",
      content: "Warehouse",
    },
    {
      id: "property7",
      content: "Building",
    },
  ];

export const housePriceRange = [
  {
    id: "property0",
    content: "Sans prix",
  },
  {
    id: "property1",
    content: "< 100 000",
  },
  {
    id: "property2",
    content: "100 000 - 500 000",
  },
  {
    id: "property3",
    content: "500 000 - 1 000 000",
  },
  {
    id: "property4",
    content: "1 000 000 - 2 000 000",
  },
  {
    id: "price5",
    content: "2 000 000 - 5 000 000",
  },
  {
    id: "price6",
    content: "> 5 000 000",
  },
];

export const houseView = [
  {
    id: "property1",
    content: "Vue Dégagée",
  },
  {
    id: "property2",
    content: "Vue Mer",
  },
  {
    id: "property3",
    content: "Vue Végétation",
  },
  {
    id: "property4",
    content: "Vue Ville",
  },
];

export const housePropertyStatus = [
  {
    id: "property1",
    content: "Location",
  },
  {
    id: "property2",
    content: "Achat",
  },
  {
    id: "property3",
    content: "Vente",
  },
];

export const housePropertyStatus2 = [
  {
    id: "property1",
    content: "Location",
  },
  {
    id: "property2",
    content: "Achat",
  },
  {
    id: "property3",
    content: "Vente",
  },
  {
    id: "property4",
    content: "Gestion",
  },
];

export const houseMoreCriteria = [
  {
    id: "garden",
    content: "Garden",
    state: false,
  },
  {
    id: "pool",
    content: "Pool",
    state: false,
  },
  {
    id: "seaview",
    content: "Sea view",
    state: false,
  },
  {
    id: "terrace",
    content: "Terrace",
    state: false,
  },
  {
    id: "gym",
    content: "Gym",
    state: false,
  },
  {
    id: "generator",
    content: "Generator",
    state: false,
  },
];

export const bathrooms = [
  {
    id: "bath1",
    content: "1",
  },
  {
    id: "bath2",
    content: "2",
  },
  {
    id: "bath3",
    content: "3",
  },
  {
    id: "bath4",
    content: "4",
  },
  {
    id: "bath5",
    content: "+5",
  },
];

export const bedrooms = [
  {
    id: "bed1",
    content: "1",
  },
  {
    id: "bed2",
    content: "2",
  },
  {
    id: "bed3",
    content: "3",
  },
  {
    id: "bed4",
    content: "4",
  },
  {
    id: "bed5",
    content: "+5",
  },
];
