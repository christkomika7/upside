import { env } from '@/env.config';
import { GoogleReviewType } from '@/lib/type';
import { NextResponse } from 'next/server';

export async function GET() {
    const PLACE_ID = 'ChIJmX3wPQA7fxAR_Ito6yo-FTk';
    const API_KEY = env.GOOGLE_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
            return NextResponse.json({ error: data.error_message || 'Erreur API' }, { status: 500 });
        }

        const reviews: GoogleReviewType[] = (data.result.reviews || []).filter((review: GoogleReviewType) => review.text && review.text.trim() !== '');
        const totalReviews = reviews.length;
        const rating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews || 0;
        return NextResponse.json({ reviews, totalReviews, rating });
    } catch (error) {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
