import { CheckIn, Prisma } from "@prisma/client";
import { CheckinRepository } from "../check-in-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckinRepository implements CheckinRepository {
  
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkin:CheckIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id:data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    }
    this.items.push(checkin)
    return checkin
  }

  async save(checkin: CheckIn): Promise<CheckIn> {
    const checkinIndex = this.items.findIndex(item => item.id ===checkin.id)  
    if(checkinIndex >= 0) {
      this.items[checkinIndex] = checkin
    }

    return checkin
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkin = this.items.find(item => item.id === id)

    if(!checkin) return null
    return checkin
  }


  async findByUserIdOnDate(userId: string, date: Date) {
    const dayStart = dayjs(date).startOf('date')
    const dayEnd = dayjs(date).endOf('date')

    const checkinOnSameDate = this.items.find(checkin => {
      const checkinDate = dayjs(checkin.created_at)
      const isSameDate = checkinDate.isAfter(dayStart) && checkinDate.isBefore(dayEnd)
      
      return checkin.user_id === userId && isSameDate
    })

    if(!checkinOnSameDate) return null
    return checkinOnSameDate
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.items.filter(item => item.user_id === userId).slice((page-1)*20, page*20)
  }

  async countByUserId(userId:string): Promise<number> {
    return this.items.filter(item => item.user_id === userId).length
  }
}