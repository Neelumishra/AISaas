"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { SheetContent, SheetTrigger,Sheet } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
// interface userApiLimit {
//   userApiLimit : number
// }
function Mobilesidebar({ apiLimitCount }: { apiLimitCount: number }) {
  const [Ismounted, setIsmounted] = useState(false);

  useEffect(() => setIsmounted(true), []);

  if (!Ismounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0" side={"left"}>
        <Sidebar apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
}

export default Mobilesidebar