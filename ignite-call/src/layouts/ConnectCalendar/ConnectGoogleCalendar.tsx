"use client"

import Box from "@/components/Box";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { signIn} from 'next-auth/react'
import Link from "next/link";
import {  useRouter, useSearchParams } from "next/navigation";

interface ConnectGoogleCalendarProps {
  hasUser:boolean
} 

export default function ConnectGoogleCalendar({hasUser}:ConnectGoogleCalendarProps) {
  const params = useSearchParams()
  const router = useRouter()
  const hasAuthError = params.get('error')

  

  function handleSignIn() {
    signIn('google')
  }
  function nextPage() {
    router.push('/register/time-intervals')

  }
 
  return (

        <Box className="flex gap-6 w-full flex-col p-4">

          <Box className="flex justify-between items-center p-4">
            <Text>Google Calendar</Text>
            {hasUser ? (
                <Button variant="outline" onClick={handleSignIn} disabled>
                  Usuário conectado
                  <Check/>
                </Button>
            ): (

              <Button variant="secondary" onClick={handleSignIn}>
                Conectar
                <ArrowRight />
              </Button>
            )}
          </Box>

          {hasAuthError && (
            <Text className="text-xs text-red-500">
              Falha ao se conectar ao Google, verifique se você habilitou as 
              permissões de acesso ao Google Calendar. 
            </Text>
          )}

            <Button disabled={!hasUser} onClick={nextPage}>
              Próximo passo
              <ArrowRight />
            </Button>
        </Box>
  )
}