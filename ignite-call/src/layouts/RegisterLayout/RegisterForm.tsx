"use client"

import Box from "@/components/Box";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserRound, X } from "lucide-react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from "@tanstack/react-query";
import { createUserAction } from "@/actions/create-user.action";
import PasswordInput from "@/components/PasswordInput";
import { createErrorToast } from "@/utils/create-error-toast";
import { createSuccessToast } from "@/utils/create-success-toast";

 
const formSchema = z.object({
  username: z.string()
    .regex(/^[a-z0-9_-]+$/, "Só É permitido letras, números, '-' e '_'")
    .min(4,'Mínimo 4 characteres')
    .max(50, 'Máxio 50 characteres'),
    name: z.string().min(4,'Mínimo 4 characteres'),
    password: z.string().min(4,'Mínimo 6 characteres'),
})

export default function ClaimUsernameForm() {
  const searchParams = useSearchParams()
  const router = useRouter()



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: searchParams.get('username') ?? '',
      name:"",
      password:""
    },
  })

  const createUserMutation = useMutation({
    mutationFn: createUserAction,
    onError:(err) =>{
      console.log({err});
      if(err.message ==='user-already-exist') {

        createErrorToast({
          title:"Nome de usuário já cadastrado",
          description: "Esse nome de usuário já está sendo utilizado por outro usuário."
        })
        return
      }
      createErrorToast({
        title:"Error creating a user.",
      })
    },
    onSuccess: (data) => {
      router.push('/register/connect-calendar')
      createSuccessToast({
        title: "User has been created."
      })
    }
  })

 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    createUserMutation.mutate({
      name: values.name,
      username: values.username,
      password: values.username,
    })
  }
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
        <Box className="flex gap-6 w-full flex-col p-4">
          <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>nome de usuário</FormLabel>
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

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <TextInput placeholder="Seu Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      
          <Button disabled={createUserMutation.isPending}>
            Próximo passo
            <ArrowRight />
          </Button>

        </Box>
      </form>
    </Form>
  )
}