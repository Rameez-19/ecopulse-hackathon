import { NextResponse } from 'next/server';
import { getCoachRecommendations } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userData } = body;

    if (!userData) {
      return NextResponse.json({ error: 'Missing user data' }, { status: 400 });
    }

    const recommendations = await getCoachRecommendations(userData);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('Error in coach API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
