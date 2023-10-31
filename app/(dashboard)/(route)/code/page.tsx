"use client";
import Heading from "@/components/heading";
import { FormControl, FormField, FormItem, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/empty";

import * as z from "zod";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import Useravatar from "@/components/useravatar";
import BotAvatar from "@/components/botavatar";
import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/use-pro-modal";
function CodePage() {
  const useModal =useProModal()
  const router = useRouter();
  const [message, setMessage] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: value.prompt,
      };
      const newMessage = [...message, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessage,
      });
      console.log(response);

      setMessage((current) => [...current, userMessage, response.data]);
      // [{role:"user",content:"cannot find"},{content:"raduius 6lkh"}]

      setTimeout(() => console.log(message), 1000);
    } catch (e:any) {
      if(e?.response?.status === 403){
          useModal.onOpen()
      }
    } finally {
      router.refresh();
    }
  };
  const loading = form.formState.isSubmitting;
  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate Code using descrpitive text.."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={loading}
                      placeholder="Simple toggle button using react hooks"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              type="submit"
              disabled={loading}
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4 ">
        {loading && (
          <div className="p-8 rounded-lg w-full bg-muted flex items-center justify-center">
            <Loader />
          </div>
        )}
        {message.length === 0 && !loading && <Empty label="Start Typing.." />}
        <div className="flex flex-col-reverse gap-y-4">
          {message.map((e) => (
            <div
              className={cn(
                "p-8 w-full flex items-start rounded-lg gap-x-8",
                e.role === "user"
                  ? "bg-white border border-black/10"
                  : "bg-muted"
              )}
              key={e.content}
            >
              {e.role === "user" ? <Useravatar /> : <BotAvatar />}
              <ReactMarkdown
                className="text-sm overflow-hidden leading-7"
                components={{
                  pre: ({ node, ...props }) => (
                    <div className="overflow-auto w-full m-y-2 bg-black/10 p-2 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-black/10 rounded-lg px-1" {...props} />
                  ),
                }}
              >
                {e.content || ""}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CodePage;
