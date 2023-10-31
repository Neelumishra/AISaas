import { NextResponse } from "next/server";
import { Configuration, OpenAIApi ,ChatCompletionRequestMessage } from "openai";
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
    console.log("This is body", body);
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrail = await checkApiLimit();
    if (!freeTrail) {
      return new NextResponse("Free trial has been expired", {
        status: 403,
      });
    }
    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [InstructionMessage, ...messages],
    // });
  await increaseApiLimit();
    return NextResponse.json({
      content: "Sure, here's an example of how to create a simple toggle button in React:```jsximport React, { Component } from 'react';class ToggleButton extends Component {constructor(props) {super(props);this.state = {isToggled: false,};}handleToggle = () => {this.setState((prevState) => ({isToggled: !prevState.isToggled,}));};render(){return(<div><button onClick={this.handleToggle}> {this.state.isToggled ? 'ON' : 'OFF'}</button></div>);}}export default ToggleButton;```You can use this `ToggleButton` component in your React application to create a simple toggle button. When clicked, it will toggle between displaying `ON` and `OFF` on the button. The button's state is managed using React's local state."});
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
