import { NextResponse } from "next/server";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { auth } from "@clerk/nextjs";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit"; 
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);
const InstructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator.You must answer only in markdown code snipet.Use code comment for explanation",
};
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { prompt, amount = 1, resolution = "512*512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!prompt) {
      return new NextResponse("Prompt  is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount  is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution  is required", { status: 400 });
    }
const freeTrail = await checkApiLimit();
if (!freeTrail) {
  return new NextResponse("Free trial has been expired", {
    status: 403,
  });
}
    // const response = await openai.createImage({
    //   prompt,
    //   n: parseInt(amount, 10),
    //   size: resolution,
    // });
await increaseApiLimit();
    // return NextResponse.json(response.data.data);
     return NextResponse.json([
       {url:"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=1380&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
       {url:"https://images.unsplash.com/photo-1695653422902-1bea566871c6?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"},
       {url:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"},
       {url:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
     ]);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
