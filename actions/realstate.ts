import { env } from "@/env.config";
import { EditRealStateSchemaType, RealStateSchemaType } from "@/lib/schemas";
import {
  HouseFilterType,
  RealStateCategoriesType,
  RealStateDisponibilityType,
  RealStateLocationType,
  RealStateType,
  RequestResponse,
} from "@/lib/type";
import { toast } from "sonner";

export async function all(
  page: number,
  pageSize: number,
  search?: string | null,
  city?: string | null,
  area?: string | null,
  property?: string | null,
  status?: string | null,
  bedroom?: string | null,
  bathroom?: string | null,
  price?: string | null,
  view?: string | null,
  garden?: boolean | null,
  furnished?: boolean | null,
  pool?: boolean | null,
  generator?: boolean | null,
  gym?: boolean | null,
  terrace?: boolean | null,
) {
  const updatedPrice = price === "Sansprix" ? "noprice" : price;
  console.log({ updatedPrice, price })
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/realstate?page=${page}&pageSize=${pageSize}&search=${search}&city=${city}&area=${area}&property=${property}&status=${status}&bedroom=${bedroom}&bathroom=${bathroom}&price=${updatedPrice}&garden=${garden}&view=${view}&furnished=${furnished}&pool=${pool}&generator=${generator}&gym=${gym}&terrace=${terrace}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function create(data: RealStateSchemaType) {
  const formData = new FormData();
  let totalSize = 0;
  for (let i = 0; i < data.images.length; i++) {
    totalSize += data.images[i].size;
  }

  if (totalSize > 100 * 1024 * 1024) {
    toast.warning(
      "Les images sont très volumineuses. L'envoi peut prendre du temps.",
    );
  }

  for (let i = 0; i < data.images.length; i++) {
    formData.append("images", data.images[i]);
  }

  formData.append(
    "data",
    JSON.stringify({
      ...data,
      images: undefined,
    }),
  );

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10 * 60 * 1000); // 10 min

    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/realstate`,
      {
        method: "POST",
        body: formData,
        signal: controller.signal,
      },
    );

    clearTimeout(timeout);

    const res: RequestResponse<RealStateType[]> = await response.json();

    if (!response.ok) {
      throw new Error(res.message || "Erreur lors de l'envoi");
    }

    return res;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(
        "Le téléchargement a pris trop de temps. Essayez des fichiers plus légers.",
      );
    }
    throw error;
  }
}

export async function edit(data: EditRealStateSchemaType & { id: string }) {
  const formData = new FormData();
  let totalSize = 0;

  if (Array.isArray(data.images) && data.images.length > 0) {
    for (let i = 0; i < data.images!.length; i++) {
      totalSize += data.images![i].size;
    }
    if (totalSize > 100 * 1024 * 1024) {
      toast.warning(
        "Les images sont très volumineuses. L'envoi peut prendre du temps.",
      );
    }
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
  }

  formData.append(
    "data",
    JSON.stringify({
      ...data,
      images: undefined,
    }),
  );

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10 * 60 * 1000); // 10 min

    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/realstate/${data.id}`,
      {
        method: "PUT",
        body: formData,
        signal: controller.signal,
      },
    );

    clearTimeout(timeout);

    const res: RequestResponse<RealStateType[]> = await response.json();
    if (!response.ok) {
      throw new Error(res.message || "Erreur lors de l'envoi");
    }

    return res;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(
        "Le téléchargement a pris trop de temps. Essayez des fichiers plus légers.",
      );
    }
    throw error;
  }
}

export async function unique({ id }: { id: string }) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/realstate/${id}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function exportToPdf({ id }: { id: string }) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/realstate/export/${id}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function realstates() {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/realstate/total`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function remove({ id }: { id: string }) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/realstate/${id}`,
      {
        method: "DELETE",
      },
    );

    const data: RequestResponse<RealStateType[]> = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function editVisibility({ id, isOnline }: { id: string, isOnline: boolean }) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/realstate/visibility/${id}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isOnline }),
      },
    );

    const data: RequestResponse<RealStateType[]> = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function buy(filter: HouseFilterType) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/houses/buy?page=${filter.page}&pageSize=${filter.pageSize}&city=${filter.city}&district=${filter.district}&property=${filter.property}&bedroom=${filter.bedroom}&bathroom=${filter.bathroom}&price=${filter.price}&furnished=${filter.furnished}&garden=${filter.garden}&view=${filter.view}&pool=${filter.pool}&generator=${filter.generator}&gym=${filter.gym}&terrace=${filter.terrace}&filter=${filter.filter}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function rent(filter: HouseFilterType) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/houses/rent?page=${filter.page}&pageSize=${filter.pageSize}&city=${filter.city}&district=${filter.district}&property=${filter.property}&bedroom=${filter.bedroom}&bathroom=${filter.bathroom}&price=${filter.price}&view=${filter.view}&garden=${filter.garden}&furnished=${filter.furnished}&pool=${filter.pool}&generator=${filter.generator}&gym=${filter.gym}&terrace=${filter.terrace}&filter=${filter.filter}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function categoriesTotals() {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/houses/category`,
      {
        method: "GET",
      },
    );
    const data: RequestResponse<RealStateCategoriesType> =
      await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function disponibilitiesHouse() {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/houses/disponibility`,
      {
        method: "GET",
      },
    );
    const data: RequestResponse<RealStateType[]> =
      await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function locationsTotals() {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/houses/location`,
      {
        method: "GET",
      },
    );
    const data: RequestResponse<RealStateLocationType> =
      await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}
