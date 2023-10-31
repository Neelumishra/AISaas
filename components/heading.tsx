import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React, { ReactElement, ReactNode } from "react";
interface Heading {
  title: string;
  description: string;
  icon: any;
  bgColor?: string;
  iconColor?: string;
}
function Heading({title,description,icon:Icon,bgColor,iconColor}:Heading) {
 return(
     <>
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        <Icon className={cn("w-10 h-10",iconColor)}/>
      </div>
      <div>
        <h2 className="text-3xl font-bold ">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>  
    </div>
  </>
 )
}

export default Heading;
