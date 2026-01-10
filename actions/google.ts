import { env } from "@/env.config";
import { GoogleReviewType, RequestResponse } from "@/lib/type";

export async function reviews() {
    try {
        const response = await fetch(
            `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/google/reviews`,
            {
                method: "GET",
            },
        );

        const data: RequestResponse<{ reviews: GoogleReviewType[], totalReviews: number; rating: number }> =
            await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data
    } catch (error) {
        throw error;
    }
}
