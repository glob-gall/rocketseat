"use server"

import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
 
type UpdateUserBioActionParams = {
  bio:string
}


 
export async function updateUserBioAction({bio}:UpdateUserBioActionParams) {
  const cookieStore = await cookies()
  const userId = cookieStore.get('@ignite-call:userId')
  if(!userId?.value) throw new Error('not-allowed')

  await prisma.user.update({
    where:{ id: userId.value },
    data:{ bio }
  }) 

} 