import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode, useMemo } from "react";

interface TextInputProps extends ComponentProps<typeof Input> {
  before?: ReactNode
  after?: ReactNode
}

interface BeforeOfAfterProps {
  children: ReactNode
}

function BeforeOrAfter({children}:BeforeOfAfterProps) {
  return (
    <span 
      className="text-nowrap text-accent-secondary flex items-center gap-1 h-full" 
    >
      {children}
    </span>
  )
}

export default function TextInput({before,after,...props}:TextInputProps) {
  return (
    <div className={cn(
      "bg-accent flex-1 flex items-center pl-2 pr-1 h-9 border rounded-md",
      "",
      )}>
        {before && (
          <BeforeOrAfter>
            {before}
          </BeforeOrAfter>
        )}
        <Input {...props} className={"p-0 m-0"}/>
        {after && (
          <BeforeOrAfter>
            {after}
          </BeforeOrAfter>
        )}
    </div>
  )
}