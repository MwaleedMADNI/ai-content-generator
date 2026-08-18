import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ result: 'GROQ_API_KEY missing in environment variables.' });
    }

    const prompt = `You are an expert social media content creator. Create viral content for the topic: "${topic}".
    Provide the output in clean, structured format with exact headers:

    ### 🪝 Hook Options
    - Give 3-5 catchy hook variations.

    ### 📌 Hashtags
    - Provide relevant high-reach and niche hashtags.

    ### 📝 Platform Captions
    Write one unique, platform-appropriate caption for each of the following, matching that platform's tone and style:
    - **Instagram**: engaging, emoji-friendly caption (2-4 sentences)
    - **Facebook**: slightly longer, conversational caption
    - **LinkedIn**: professional, value-driven caption
    - **TikTok**: short, punchy, trend-aware caption

    ### 🎬 Instagram Reel Scripts
    Provide exactly 3 different, unique Instagram Reel scripts for this topic. Label them clearly as "Script 1", "Script 2", and "Script 3". Each script must have a different angle/approach and include line-by-line visual & audio direction.

    ### 📣 Call To Action (CTA)
    - Provide strong CTAs to drive engagement and followers.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: prompt }]
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ result: `Groq API Error: ${data.error.message}` });
    }

    const result = data.choices?.[0]?.message?.content || 'No content generated.';

    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ result: `Server Error: ${error.message}` }, { status: 500 });
  }
}