import { prisma } from "@/lib/prisma";
import {Prisma, User} from '@prisma/client'
import { UserRepository } from "../user-repository";
export class PrismaUsersRepository implements UserRepository{
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({data})
  }

  async findByEmail(email: string): Promise<User | null> {
    const userWithSameEmail = await prisma.user.findUnique({where:{email}})
    return userWithSameEmail
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({where:{id}})
    return user
  }
}