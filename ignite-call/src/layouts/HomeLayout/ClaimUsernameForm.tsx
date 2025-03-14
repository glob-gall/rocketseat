"use client"

import Box from "@/components/Box";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserRound } from "lucide-react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import slugify from "@/utils/slugify";
 
const formSchema = z.object({
  username: z.string()
    .min(4,'Mínimo 4 characteres')
    .max(50, 'Máxio 50 characteres')
    .transform(txt => slugify(txt)),
})

export default function ClaimUsernameForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({username}: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    router.push(`/register?username=${username}`)
  }
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
        <Box className="flex gap-2 w-full">
          <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl >
                    <TextInput
                    placeholder="seu-username"
                    {...field} 
                      before={
                      <>
                        <UserRound />
                        ignite.com/
                      </>
                    }/>
                  </FormControl>
                  <FormMessage className="" />
                </FormItem>
              )}
            />
      
          <Button>
            Reservar
            <ArrowRight />
          </Button>

        </Box>
      </form>
    </Form>
  )
}