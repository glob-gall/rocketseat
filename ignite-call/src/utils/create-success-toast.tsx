import { ExternalToast, toast } from "sonner";
import { Check } from 'lucide-react'

interface createSuccessToastParams extends ExternalToast {
  title:string
} 

export function createSuccessToast(params:createSuccessToastParams) {
  toast(params.title,{
    ...params,
    icon:<Check className="rounded-full p-0.5 bg-green-500 text-neutral-100"  size={20}/>,
    duration:10000
  })
}