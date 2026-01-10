import { env } from "@/env.config";
import { AreaSchemaType } from "@/lib/schemas";
import { AreaType, RequestResponse } from "@/lib/type";

export async function all(page: number,
    pageSize: number, search?: string | null) {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/area?page=${page}&pageSize=${pageSize}&search=${search}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const data: RequestResponse<AreaType[]> = await response.json()
            throw new Error(data.message);
        }
        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function create(data: AreaSchemaType) {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/area`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        });

        if (!response.ok) {
            const data: RequestResponse<AreaType[]> = await response.json()
            throw new Error(data.message);
        }
        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function update(data: AreaSchemaType & { id: string }) {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/area/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        });

        if (!response.ok) {
            const data: RequestResponse<AreaType[]> = await response.json()
            throw new Error(data.message);
        }
        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function areas() {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/area/total`, {
            method: 'GET',
        });

        if (!response.ok) {
            const data: RequestResponse<null> = await response.json()
            throw new Error(data.message);
        }
        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function remove({ id }: { id: string }) {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/area/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const data: RequestResponse<AreaType[]> = await response.json()
            throw new Error(data.message);
        }
        return await response.json();

    } catch (error) {
        throw error;
    }
}