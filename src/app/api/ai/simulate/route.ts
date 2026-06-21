import { NextResponse } from 'next/server';
import { simulateEcoFuture } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { currentCo2, scenario } = body;

    if (!currentCo2 || !scenario) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const simulation = await simulateEcoFuture(currentCo2, scenario);

    return NextResponse.json({ simulation });
  } catch (error) {
    console.error('Error in simulate API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
