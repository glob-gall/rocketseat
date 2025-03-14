import { ExternalToast, toast } from "sonner";
import { X } from 'lucide-react'

interface createErrorToastParams extends ExternalToast {
  title:string
} 

export function createErrorToast(params:createErrorToastParams) {
  toast(params.title,{
    ...params,
    icon:<X className="rounded-full p-0.5 bg-red-500 text-neutral-100"  size={20}/>,
    duration:10000
  })
}