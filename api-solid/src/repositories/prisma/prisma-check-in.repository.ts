import { Prisma, CheckIn } from "@prisma/client";
import { CheckinRepository } from "../check-in-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckinRepository implements CheckinRepository {

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkin = await prisma.checkIn.create({
      data
    })

    return checkin
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkin = await prisma.checkIn.findUnique({
      where: { id }
    })

    return checkin
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const dayStart = dayjs(date).startOf('date')
    const dayEnd = dayjs(date).endOf('date')

    const checkin = prisma.checkIn.findFirst({
       where:{
        user_id: userId,
        created_at: {
          gte: dayStart.toDate(),
          lte: dayEnd.toDate()
        }
       }
    })
    
    return checkin
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkins = prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take:20,
      skip: (page -1) * 20
    })

    return checkins
  }

  async countByUserId(userId: string): Promise<number> {
    const checkins = prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })

    return checkins
  }

  async save(data: CheckIn): Promise<CheckIn> {
    const checkin = await prisma.checkIn.update({
      where: { id: data.id },
      data
    })

    return checkin
  }
  
}