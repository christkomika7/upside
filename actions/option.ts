import { env } from "@/env.config";
import { OptionSchemaType } from "@/lib/schemas";
import { OptionType, RequestResponse } from "@/lib/type";
import { createFileFromImageName } from "@/lib/utils";

export async function all(
  page: number,
  pageSize: number,
  search?: string | null,
) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/option?page=${page}&pageSize=${pageSize}&search=${search}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function unique(id: string) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/option/${id}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }

    const res = await response.json();

    if (!res.data) {
      return {
        state: "success",
        message: "",
        data: null,
      };
    }
    const file = await createFileFromImageName(res.data.icon);

    return {
      data: {
        ...res.data,
        icon: file,
      },
      state: "success",
      message: "",
    };

    return res;
  } catch (error) {
    throw error;
  }
}

export async function create(data: OptionSchemaType) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("translate", data.translate);
  if (data.icon) {
    formData.append("icon", data.icon ? (data.icon as File) : "");
  }
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/option`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const data: RequestResponse<OptionType[]> = await response.json();
      throw new Error(data.message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function update(data: OptionSchemaType & { id: string }) {
  return;
  const formData = new FormData();
  formData.append("id", data.id);
  formData.append("name", data.name);
  formData.append("translate", data.translate);
  if (data.icon) {
    formData.append("icon", data.icon ? (data.icon as File) : "");
  }
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/option/${data.id}`,
      {
        method: "PUT",
        body: formData,
      },
    );

    if (!response.ok) {
      const data: RequestResponse<OptionType[]> = await response.json();
      throw new Error(data.message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function list() {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/option/list`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      const data: RequestResponse<OptionType> = await response.json();
      throw new Error(data.message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function options() {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/option/total`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      const data: RequestResponse<OptionType> = await response.json();
      throw new Error(data.message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function remove({ id }: { id: string }) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/option/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      const data: RequestResponse<OptionType> = await response.json();
      throw new Error(data.message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
