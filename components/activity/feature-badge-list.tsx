import { Badge } from "@/components/ui/badge";
import {
  BedIcon,
  BathIcon,
  FurnishedIcon,
  EquippedKitchenIcon,
  TerraceIcon,
  SecurityIcon,
  PMRIcon,
  ElevatorIcon,
  PoolIcon,
  InternetIcon,
  GymIcon,
  GardenIcon,
  GeneratorIcon,
  ParkingIcon,
  ClimIcon,
  RoomIcon,
} from "../ui/icon";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { FeatureBadgeListIdType } from "@/data";
import v from "voca";
import { OptionType } from "@/lib/type";
import Image from "next/image";

const FEATURES = [
  { key: "bedroom", icon: BedIcon, specialFormat: true },
  { key: "bathroom", icon: BathIcon, specialFormat: true },
  { key: "room", icon: RoomIcon, specialFormat: true },
  { key: "furnished", icon: FurnishedIcon },
  { key: "equippedKitchen", icon: EquippedKitchenIcon },
  { key: "terrace", icon: TerraceIcon },
  { key: "security", icon: SecurityIcon },
  { key: "pmr", icon: PMRIcon },
  { key: "elevator", icon: ElevatorIcon },
  { key: "pool", icon: PoolIcon },
  { key: "internet", icon: InternetIcon },
  { key: "gym", icon: GymIcon },
  { key: "garden", icon: GardenIcon },
  { key: "generator", icon: GeneratorIcon },
  { key: "parking", icon: ParkingIcon },
  { key: "clim", icon: ClimIcon },
];
interface FeatureBadgeListProps {
  data: Record<string, any>;
  options?: OptionType[];
}

export default function FeatureBadgeList({
  data,
  options,
}: FeatureBadgeListProps) {
  const t = useScopedI18n("product");
  const locale = useCurrentLocale();
  return (
    <div className="relative flex flex-wrap gap-1 bg-(--blue-light)/40 p-2 rounded-[20px] w-full">
      {FEATURES.map(({ key, icon: Icon, specialFormat }) => {
        const value = data[key];
        if (!value) return null;

        let label = t(key as FeatureBadgeListIdType);

        if (specialFormat) {
          label = `${
            Number(value) === 6 ? "+5" : value
          } ${t(key as FeatureBadgeListIdType)}${Number(value) > 1 ? "s" : ""}`;
        }

        return (
          <Badge
            key={key}
            variant="address"
            className="gap-x-2 grid grid-cols-[20px_1fr] !w-fit"
          >
            <span className="flex h-5">
              <Icon className="fill-(--turquoise)" />
            </span>
            {label}
          </Badge>
        );
      })}
      {options?.map((option) => (
        <Badge
          variant="address"
          key={option.id}
          className="gap-x-2 grid grid-cols-[20px_1fr] !w-fit"
        >
          {option.icon && option.icon.endsWith(".svg") ? (
            // <ReactSVG
            //   src={option.icon as string}
            //   beforeInjection={(svg) => {
            //     svg.setAttribute("width", "20");
            //     svg.setAttribute("height", "20");
            //   }}
            // />
            <Image src={option.icon} alt={option.name} width={20} height={20} />
          ) : null}
          {option.translate && locale === "en"
            ? v.titleCase(option.translate)
            : v.titleCase(option.name)}
        </Badge>
      ))}
    </div>
  );
}
