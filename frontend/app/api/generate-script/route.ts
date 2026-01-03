import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic } = body;

    // 1. نتأكدوا واش الساروت تقرا
    console.log("Testing API Key...");
    if (!process.env.GROQ_API_KEY) {
      throw new Error("API Key is missing from .env file!");
    }

    console.log("Sending request to Groq for topic:", topic);

    // 2. نصيفطو الطلب
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Write a short script about: ${topic}`,
        },
      ],
    model: "llama-3.3-70b-versatile",
    });

    const script = completion.choices[0]?.message?.content || "";
    
    // 3. النجاح
    return NextResponse.json({ script });

  } catch (error: any) {
    // 4. فضح المشكل
    console.error("Detailed Error:", error);
    return NextResponse.json({ 
      error: "Error happened", 
      details: error.message // هنا غيبان السبب الحقيقي
    }, { status: 500 });
  }
}
