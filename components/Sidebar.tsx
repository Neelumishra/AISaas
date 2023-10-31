"use client";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import FreeCounter from "./ui/freecounter";
const MontserratFont = Montserrat({ weight: "600", subsets: ["latin"] });

const route = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-voilet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-7",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
interface SidebarProps {
  apiLimitCount : number
}
function Sidebar({ apiLimitCount = 0 }:SidebarProps) {
  const pathName = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white border-2">
      <div className="px-3 py-2 flex-1">
        <Link className="flex items-center pl-3 mb-14" href="/dashboard">
          <div className="relative w-8 h-8 mr-4 bg-transparent">
            <Image fill alt="" src="/logo.webp" />
          </div>
          <h1 className={cn("text-2xl font-bold", MontserratFont.className)}>
            Genius
          </h1>
        </Link>
        <div className="space-y-1">
          {route.map((e) => (
            <Link
              href={e.href}
              key={e.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white transition hover:bg-white/10 rounded-lg",
                pathName == e.href ? "text-white bg-white/10" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1 ">
                <e.icon className={cn("h-5 mr-3 w-5", e.color)} />
                {e.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter
      apiLimitCount = {apiLimitCount} 
      />
    </div>
  );
}

export default Sidebar;
