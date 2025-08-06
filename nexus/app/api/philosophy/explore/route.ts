import { NextRequest, NextResponse } from 'next/server';
import { PhilosophicalAI } from '@/lib/ai/philosophical-ai';

export async function POST(request: NextRequest) {
  try {
    const { philosopher, domain, type, argument, influence } = await request.json();
    
    if (!philosopher) {
      return NextResponse.json({ error: 'Philosopher name is required' }, { status: 400 });
    }

    const ai = PhilosophicalAI.getInstance();
    let result;

    switch (type) {
      case 'domain':
        if (!domain) {
          return NextResponse.json({ error: 'Domain is required for domain exploration' }, { status: 400 });
        }
        result = await ai.exploreDomain(philosopher, domain);
        break;
      
      case 'argument':
        if (!argument) {
          return NextResponse.json({ error: 'Argument is required for argument exploration' }, { status: 400 });
        }
        result = await ai.exploreArgument(philosopher, argument);
        break;
      
      case 'influence':
        if (!influence) {
          return NextResponse.json({ error: 'Influence is required for influence exploration' }, { status: 400 });
        }
        result = await ai.exploreInfluence(philosopher, influence);
        break;
      
      default:
        return NextResponse.json({ error: 'Invalid exploration type' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Philosophy exploration API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}