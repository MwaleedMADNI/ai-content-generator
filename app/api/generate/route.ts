import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Aap ek social media expert hain. Topic: "${topic}" ke liye 3 viral video hooks, script outline aur relevant hashtags generate karein.`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    });

    const output = completion.choices[0]?.message?.content || 'No output generated.';

    return NextResponse.json({ output });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    );
  }
}