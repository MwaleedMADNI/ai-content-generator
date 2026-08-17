import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ result: 'API Key missing in environment variables.' });
    }

    const prompt = `You are an expert social media content creator. Create viral content for the topic: "${topic}".
    Provide the output in clean, structured format with exact headers:

    🪝 Hook Options
    - Give 3-5 catchy hook variations.

  📌 Hashtags
    - Provide relevant high-reach and niche hashtags.

    🎬 Full Script
    - Detail line-by-line visual & audio script.

    📣 Call To Action (CTA)
    - Provide strong CTAs to drive engagement and followers.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ result: `Groq API Error: ${data.error.message}` });
    }

    const result = data.choices?.[0]?.message?.content || 'No content generated from API.';

    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ result: `Server Error: ${error.message}` }, { status: 500 });
  }
}