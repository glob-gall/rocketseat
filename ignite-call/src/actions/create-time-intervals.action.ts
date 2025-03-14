"use server"

import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

interface IntervalData {
  endTimeInMinutes: number
  startTimeInMinutes:number
  weekDay:number

}

interface createIntervalsProps {
  intervals: IntervalData[]
}
export async function createTimeIntervals({intervals}:createIntervalsProps) {
  const cookieStore = await cookies()

  const userId = cookieStore.get('@ignite-call:userId')
  if(!userId?.value) throw new Error('not-allowed')
    
  const user = prisma.user.findUnique({where:{id: userId.value}})
  if(!user) throw new Error('user-not-found')


    
  await prisma.userTimeInterval.deleteMany({
    where:{ user_id: userId.value}
  })  

  // BECAUSE SQLITE DOSENT SUPORT createMany FUNCTION
  await Promise.all(
    intervals.map(
      interval => prisma.userTimeInterval.create({data: {
        user_id: userId?.value,
        time_start_in_minutes: interval.startTimeInMinutes, 
        time_end_in_minutes: interval.endTimeInMinutes, 
        week_day: interval.weekDay
      }})
    )
  )

  // IF NOT USING SQLITE
  // await prisma.userTimeInterval.createMany({
  //   data: intervalsWithUserId
  // })
}