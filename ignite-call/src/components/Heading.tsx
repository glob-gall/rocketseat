import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";


interface HeadingProps extends ComponentProps<'h1'>  {
  children: ReactNode
  h?: 'h1'| 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} 

export default function Heading({children,h='h1',className,...props}:HeadingProps) {
  const Tag = h
  return (
    <Tag 
      className={cn("font-bold text-4xl",className)} 
      {...props}
    >
      {children}
    </Tag>
  ) 
}