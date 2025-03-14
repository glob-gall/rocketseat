import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";


interface BoxProps extends ComponentProps<'h1'>  {
  children: ReactNode

} 

export default function Box({children,className,...props}:BoxProps) {
  return (
    <div 
      className={cn("bg-primary-foreground p-2 border rounded-md",className)} 
      {...props}
    >
  
      {children}
  
    </div>
  )
}