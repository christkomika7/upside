import { env } from "@/env.config";
import { FiltersType, RequestResponse } from "@/lib/type";

export async function filters() {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/filters`, {
            method: 'GET',
        });

        if (!response.ok) {
            const data: RequestResponse<FiltersType> = await response.json()
            throw new Error(data.message);
        }
        return await response.json();

    } catch (error) {
        throw error;
    }
}