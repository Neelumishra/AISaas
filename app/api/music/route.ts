import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
   const freeTrail = await checkApiLimit();
   const isPro = await checkSubscription();
    if (!freeTrail && !isPro) {
      return new NextResponse("Free trial has been expired", {
        status: 403,
      });
    }
  try {
    const { userId } = auth();
    const body = await req.json();
    console.log("This is body", body);
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("prompt is required", { status: 400 });
    }
  
    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: "funky synth solo",
        },
      }
    );
      if(!isPro){
        await increaseApiLimit();
          const freeTrail = await checkApiLimit();
          const isPro = await checkSubscription();
          

          if (!freeTrail && !isPro) {
            return new NextResponse("Free trial has been expired", {
              status: 403,
            });
          }
      }
   
    return NextResponse.json(response);
  } catch (error) {
    console.log("[MUSIC_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
