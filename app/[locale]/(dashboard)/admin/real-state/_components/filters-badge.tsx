import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
import { FilterState } from "@/lib/type";

type FiltersBadgeProps = {
  filters: FilterState;
  clearFilter(key: keyof FilterState): void;
  updateCriteria(
    criteriaKey: keyof FilterState["criteria"],
    value: boolean
  ): void;
};

export default function FiltersBadge({
  filters,
  clearFilter,
  updateCriteria,
}: FiltersBadgeProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.search && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          #{filters.search}
          <span
            className="cursor-pointer"
            onClick={() => clearFilter("search")}
          >
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.city && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          #{filters.city}
          <span className="cursor-pointer" onClick={() => clearFilter("city")}>
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.area && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          #{filters.area}
          <span className="cursor-pointer" onClick={() => clearFilter("area")}>
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.property && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          #{filters.property}
          <span
            className="cursor-pointer"
            onClick={() => clearFilter("property")}
          >
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.category && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          #{filters.category}
          <span
            className="cursor-pointer"
            onClick={() => clearFilter("category")}
          >
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.bedroom && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          # {filters.bedroom} Chambre{Number(filters.bedroom) !== 1 && "s"}
          <span
            className="cursor-pointer"
            onClick={() => clearFilter("bedroom")}
          >
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.bathroom && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          # {filters.bathroom} Douche{Number(filters.bathroom) !== 1 && "s"}
          <span
            className="cursor-pointer"
            onClick={() => clearFilter("bathroom")}
          >
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.view && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          # {filters.view}
          <span className="cursor-pointer" onClick={() => clearFilter("view")}>
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.price && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          #{filters.price}
          <span className="cursor-pointer" onClick={() => clearFilter("price")}>
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.criteria.garden && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          #Jardin
          <span
            className="cursor-pointer"
            onClick={() => updateCriteria("garden", false)}
          >
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.criteria.generator && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          #Groupe électrogène
          <span
            className="cursor-pointer"
            onClick={() => updateCriteria("generator", false)}
          >
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.criteria.gym && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          #Salle de sport
          <span
            className="cursor-pointer"
            onClick={() => updateCriteria("gym", false)}
          >
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.criteria.pool && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          #Piscine
          <span
            className="cursor-pointer"
            onClick={() => updateCriteria("pool", false)}
          >
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.criteria.furnished && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          #Meublé
          <span
            className="cursor-pointer"
            onClick={() => updateCriteria("furnished", false)}
          >
            <XIcon size={13} />
          </span>
        </Badge>
      )}
      {filters.criteria.terrace && (
        <Badge variant="filter2" className="flex items-center gap-x-1 py-2">
          #Terrace
          <span
            className="cursor-pointer"
            onClick={() => updateCriteria("terrace", false)}
          >
            <XIcon size={13} />
          </span>
        </Badge>
      )}
    </div>
  );
}
