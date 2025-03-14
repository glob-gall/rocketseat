import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";


interface TextProps extends ComponentProps<'h1'>  {
  children: ReactNode
  type?: 'p' | 'span' | 'strong'
} 

export default function Text({children,type='p',className,...props}:TextProps) {
  const Tag = type
  return <Tag className={cn("text-lg",className)} {...props}>{children}</Tag>
}