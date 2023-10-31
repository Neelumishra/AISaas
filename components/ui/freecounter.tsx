"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./card";
import { MAX_FREE_SIZE } from "@/constant";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
interface FreeCounterProps {
  apiLimitCount: number;
}
function FreeCounter({ apiLimitCount = 0 }: FreeCounterProps) {
  const [mounted, setMounted] = useState(false);
  const useModal =useProModal()
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_SIZE} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_SIZE) * 100}
            />
          </div>
          <Button className="w-full" variant={"premium"} onClick={useModal.onOpen}>
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default FreeCounter;
