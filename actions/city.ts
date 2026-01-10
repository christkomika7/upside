import { env } from "@/env.config";
import { CitySchemaType } from "@/lib/schemas";
import { CityType, RequestResponse } from "@/lib/type";

export async function all(page: number,
    pageSize: number, search?: string | null) {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/city?page=${page}&pageSize=${pageSize}&search=${search}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.error);
        }
        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function create(data: CitySchemaType) {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/city`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        });

        if (!response.ok) {
            const data: RequestResponse<CityType[]> = await response.json()
            throw new Error(data.message);
        }
        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function update(data: CitySchemaType & { id: string }) {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/city/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        });

        if (!response.ok) {
            const data: RequestResponse<CityType[]> = await response.json()
            throw new Error(data.message);
        }
        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function cities() {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/city/total`, {
            method: 'GET',
        });

        if (!response.ok) {
            const data: RequestResponse<CityType> = await response.json()
            throw new Error(data.message);
        }
        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function remove({ id }: { id: string }) {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/city/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const data: RequestResponse<CityType[]> = await response.json()
            throw new Error(data.message);
        }
        return await response.json();

    } catch (error) {
        throw error;
    }
}