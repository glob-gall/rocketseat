import { prisma } from "@/lib/prisma"

interface createUserActionParams {
  name: string
  username: string
  password: string
}
export async function createUserAction({name,password,username}:createUserActionParams) {
  await prisma.user.create({
    data:{
      name,
      password,
      username
    }
  })
}