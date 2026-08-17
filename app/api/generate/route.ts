import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const prompt = `You are an expert social media content creator. Create viral content for the topic: "${topic}".
    Provide the output in clean, structured format with exact headers:

    ### 🪝 Hook Options
    - Give 3-5 catchy hook variations.

    ### 📌 Hashtags
    - Provide relevant high-reach and niche hashtags.

    ### 🎬 Full Script
    - Detail line-by-line visual & audio script.

    ### 📣 Call To Action (CTA)
    - Provide strong CTAs to drive engagement and followers.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const result = data.choices[0]?.message?.content || 'No content generated.';

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}