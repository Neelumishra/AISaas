"use client";
import Heading from "@/components/heading";
import { FormControl, FormField, FormItem, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/empty";

import * as z from "zod";
import { Music, Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";

function VideoPage() {
const router =useRouter()
  const [video, setVideo] = useState<string>();
  const useModal = useProModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const response = await axios.post("/api/video", value);
      console.log(response);
      setVideo(response.data[0]);
    } catch (e: any) {
      if (e?.response?.status === 403) {
        useModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };
  const loading = form.formState.isSubmitting;
  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your prompt into video"
        icon={Video}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                      placeholder="Clown fish swimming around a coral reef"
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
        {!video && !loading && (
          <Empty label="No video genertated" />
        )}
        {video && (
        <video className="w-full aspect-video rounded-lg mt-8 border bg-black"
         controls
        >
          <source src={video}></source>
        </video>)}
      </div>
    </div>
  );
}

export default VideoPage;
