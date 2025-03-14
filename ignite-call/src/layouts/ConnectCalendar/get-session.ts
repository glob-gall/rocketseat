"use server"

import { nextAuthHandler } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


interface GetSessionResponse {
  user?: {
    name:string,
    email:string
    image:string
  }
}
export async function getSession(): Promise<GetSessionResponse> {
  const session = await getServerSession(nextAuthHandler);
  return session as GetSessionResponse
}