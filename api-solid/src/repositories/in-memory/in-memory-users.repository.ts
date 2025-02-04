import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user:User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }
    this.items.push(user)
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find(item => item.id === id)

    if(!user) return Promise.resolve(null)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email)

    if(!user) return Promise.resolve(null)
    return user
  }
}