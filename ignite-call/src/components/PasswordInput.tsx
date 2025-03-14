import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, ReactNode, useCallback, useMemo, useState } from "react";
import { Button } from "./ui/button";

interface PasswordInputProps extends ComponentProps<typeof Input> {
  before?: ReactNode
  after?: ReactNode
}

interface BeforeOfAfterProps {
  children: ReactNode
}

function BeforeOrAfter({children}:BeforeOfAfterProps) {
  return (
    <span 
      className="Password-nowrap Password-accent-secondary flex items-center gap-1 h-full" 
    >
      {children}
    </span>
  )
}

export default function PasswordInput({before,after,...props}:PasswordInputProps) {
  const [active,setActive] = useState(false)

  const toggleVisibility = useCallback(() => {
    setActive(s => !s)
  },[])

  return (
    <div className="bg-accent flex-1 flex items-center pl-2 pr-1 h-9 border rounded-md">
        {before && (
          <BeforeOrAfter>
            {before}
          </BeforeOrAfter>
        )}
        
        <Input {...props} className={"p-0 m-0"} type={active?'text': 'password'} />
        
        {after && (
          <BeforeOrAfter>
            {after}
          </BeforeOrAfter>
        )}

        {/* <BeforeOrAfter> */}
          <Button variant="ghost" className="-mr-1" onClick={toggleVisibility} type="button">
            { active ? <EyeOff /> : <Eye /> }
          </Button>
        {/* </BeforeOrAfter> */}
    </div>
  )
}