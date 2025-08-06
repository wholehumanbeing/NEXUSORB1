import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface PhilosophicalInsight {
  content: string;
  suggestedPaths: string[];
  relatedConcepts: string[];
}

export class PhilosophicalAI {
  private static instance: PhilosophicalAI;
  
  public static getInstance(): PhilosophicalAI {
    if (!PhilosophicalAI.instance) {
      PhilosophicalAI.instance = new PhilosophicalAI();
    }
    return PhilosophicalAI.instance;
  }

  async exploreDomain(philosopherName: string, domain: string): Promise<PhilosophicalInsight> {
    const prompt = `You are an expert philosophical guide. Provide a brief but insightful exploration of ${philosopherName}'s work in ${domain}.

Format your response as a JSON object with:
1. "content" - A concise 2-3 sentence insight about their contribution to this domain
2. "suggestedPaths" - Array of 3-4 specific sub-topics the user could explore next
3. "relatedConcepts" - Array of 2-3 key philosophical concepts from this domain

Keep it engaging and offer clear breadcrumbs for deeper exploration. Focus on what makes ${philosopherName}'s approach unique in ${domain}.`;

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
          maxOutputTokens: 300
        }
      });

      const response = result.response;
      const parsedResult = JSON.parse(response.text() || '{}');
      return {
        content: parsedResult.content || 'Unable to generate insight.',
        suggestedPaths: parsedResult.suggestedPaths || [],
        relatedConcepts: parsedResult.relatedConcepts || []
      };
    } catch (error) {
      console.error('AI exploration error:', error);
      return {
        content: 'Unable to generate philosophical insight at this time.',
        suggestedPaths: [],
        relatedConcepts: []
      };
    }
  }

  async exploreArgument(philosopherName: string, argument: string): Promise<PhilosophicalInsight> {
    const prompt = `Analyze ${philosopherName}'s argument about "${argument}". 

Provide a JSON response with:
1. "content" - The core logic and implications of this argument (2-3 sentences)
2. "suggestedPaths" - Specific aspects to explore: ["logical structure", "historical impact", "counter-arguments", "modern relevance"]
3. "relatedConcepts" - Key philosophical terms and ideas involved

Focus on what makes this argument philosophically significant and where it leads.`;

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
          maxOutputTokens: 300
        }
      });

      const response = result.response;
      const parsedResult = JSON.parse(response.text() || '{}');
      return {
        content: parsedResult.content || 'Unable to analyze argument.',
        suggestedPaths: parsedResult.suggestedPaths || [],
        relatedConcepts: parsedResult.relatedConcepts || []
      };
    } catch (error) {
      console.error('AI argument analysis error:', error);
      return {
        content: 'Unable to analyze argument at this time.',
        suggestedPaths: [],
        relatedConcepts: []
      };
    }
  }

  async exploreInfluence(philosopherName: string, influencedBy: string): Promise<PhilosophicalInsight> {
    const prompt = `Explain how ${influencedBy} influenced ${philosopherName}'s philosophical development.

Return JSON with:
1. "content" - How this influence shaped their thinking (2-3 sentences)
2. "suggestedPaths" - Specific influences to explore: ["key concepts adopted", "points of departure", "synthesis created", "critiques developed"]
3. "relatedConcepts" - Important philosophical ideas in this influence relationship

Show the intellectual evolution and transformation of ideas.`;

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
          maxOutputTokens: 300
        }
      });

      const response = result.response;
      const parsedResult = JSON.parse(response.text() || '{}');
      return {
        content: parsedResult.content || 'Unable to explore influence.',
        suggestedPaths: parsedResult.suggestedPaths || [],
        relatedConcepts: parsedResult.relatedConcepts || []
      };
    } catch (error) {
      console.error('AI influence exploration error:', error);
      return {
        content: 'Unable to explore influence at this time.',
        suggestedPaths: [],
        relatedConcepts: []
      };
    }
  }
}