
import { type PrismaClient } from "@prisma/client"
import { Awaitable } from "next-auth"
import { Adapter,
   AdapterUser,AdapterSession,VerificationToken,AdapterAccount } from "next-auth/adapters"
import { prisma } from "../prisma"
import { cookies } from "next/headers"


// import type {
//   Adapter,
//   AdapterAccount,
//   AdapterSession,
//   AdapterUser,
// } from "@auth/core/adapters"

function stripUndefined<T>(obj: T) {
  const data = {} as T
  for (const key in obj) if (obj[key] !== undefined) data[key] = obj[key]
  return { data }
}

export function PrismaAdapter(): Adapter {
  return {

    async createUser(data:{name?:string,avatar_url?:string, email?:string}){
      const cookieStore = await cookies()
      const userIdCookie = cookieStore.get('@ignite-call:userId')
      if(!userIdCookie)throw new Error('User Id not found on cookies')

      const updatedUser = await prisma.user.update({
        where:{id: userIdCookie.value},
        data:{
          avatar_url: data.avatar_url,
          name: data.name,
          email: data.email
        }
      })

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        avatar_url: updatedUser.avatar_url,
        email: updatedUser.email ?? '',
        emailVerified: null,
        username: updatedUser.username
      }
    },

    async getUser(id:string){
      const user = await prisma.user.findUnique({where:{id}})
      if(!user) return null

      return {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url,
        email: user.email ?? '',
        emailVerified: null,
        username: user.username
      }
    },

    async getUserByEmail(email:string){
      const user = await prisma.user.findUnique({where:{email}})
      if(!user) return null

      return {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url,
        email: user.email ?? '',
        emailVerified: null,
        username: user.username
      }
    },

    async getUserByAccount({provider,providerAccountId}: Pick<AdapterAccount, "provider" | "providerAccountId">){
      const account = await prisma.account.findUnique({
        where:{
          provider_providerAccountId: {
            provider,providerAccountId
          }
        },
        include:{
          user:true
        }
      })
      
      if(!account) return null
      return {
        id: account.user.id,
        name: account.user.name,
        avatar_url: account.user.avatar_url,
        email: account.user.email ?? '',
        emailVerified: null,
        username: account.user.username
      }
    },

    async updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, "id">){
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        }
      })
      // if(!updatedUser) return;
      return {
        id: updatedUser.id,
        name: updatedUser.name,
        avatar_url: updatedUser.avatar_url,
        email: updatedUser.email ?? '',
        emailVerified: null,
        username: updatedUser.username
      }
    },

    // async deleteUser(userId: string):Promise<void>{},

    async linkAccount(account:AdapterAccount){
      await prisma.account.create({
        data: account
      })
    },

    // async unlinkAccount(){},

    async createSession(session: {
      sessionToken: string;
      userId: string;
      expires: Date;
  }){
    await prisma.session.create({
      data: {
        userId:session.userId,
        expires: session.expires,
        sessionToken: session.sessionToken,
      }
    })

    return {
      userId:session.userId,
      expires: session.expires,
      sessionToken: session.sessionToken,
    }
  },

    async getSessionAndUser(sessionToken: string){
      const findedSession = await prisma.session.findUnique({
        where:{
          sessionToken: sessionToken
        },
        include: {user:true}
      })
      if(!findedSession) return null
      const {user,...session} = findedSession

      return {
        session:{
          expires: session.expires,
          sessionToken: session.sessionToken,
          userId: session.userId
        },
        user: {
          email: user.email ?? '',
          emailVerified: null,
          id: user.id,
          name: user.name,
          username: user.username,
          avatar_url: user.avatar_url,
        },
      }
    },

    async updateSession({sessionToken,expires,userId}: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">){
      const updatedSession = await prisma.session.update({
        where:{sessionToken},
        data:{
          expires,userId
        }
      })

      return {
        expires:updatedSession.expires,
        sessionToken: updatedSession.sessionToken,
        userId: updatedSession.userId
      }
    },

    async deleteSession(sessionToken: string):Promise<void>{
      await prisma.session.delete({
        where:{sessionToken}
      })
    },

    // async createVerificationToken(verificationToken: VerificationToken):Awaitable<VerificationToken | null | undefined>{},

  //   async useVerificationToken(params: {
  //     identifier: string;
  //     token: string;
  // }):Awaitable<VerificationToken | null>{}

  }
}

