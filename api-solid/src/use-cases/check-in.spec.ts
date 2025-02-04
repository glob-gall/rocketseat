import { CheckinRepository } from "@/repositories/check-in-repository";
import { beforeEach,afterEach, describe, expect, it, vi } from "vitest";
import { CheckinUseCase } from "./check-in.usecase";
import { InMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin.repository";
import { ImMemoryGymRepository } from "@/repositories/in-memory/im-memory-gym.repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckinsError } from "./errors/max-number-of-checkins";
import { MaxDistanceError } from "./errors/max-distance";

describe('Check-in use case', ()=> {
  let checkinRepository: InMemoryCheckinRepository
  let gymRepository: ImMemoryGymRepository
  let checkinUseCase: CheckinUseCase
  
  beforeEach(async ()=> {
    checkinRepository = new InMemoryCheckinRepository()
    gymRepository = new ImMemoryGymRepository()
    checkinUseCase = new CheckinUseCase(checkinRepository,gymRepository)

    await gymRepository.create({
      id:'gym-01',
      title:'gym',
      phone:'',
      description:'',
      latitude: 0,
      longitude: 0,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shold be able to check in', async () => {
    
    
    const {checkIn} = await checkinUseCase.exec({
      gymId: 'gym-01',
      userId: '321',
      userLatitude:0,
      userLongitude:0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('shold only allow a user check-in once a day', async () => {
    vi.setSystemTime(new Date(2024,0,1,8,0,0))

    await checkinUseCase.exec({
      gymId: 'gym-01',
      userId: '321',
      userLatitude:0,
      userLongitude:0
    })
    
    await expect(() => checkinUseCase.exec({
      gymId: 'gym-01',
      userId: '321',
      userLatitude:0,
      userLongitude:0
    })).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
  })

  it('shold allow a user check-in in different days', async () => {
    vi.setSystemTime(new Date(2024,0,1,8,0,0))
    
    await checkinUseCase.exec({
      gymId: 'gym-01',
      userId: '321',
      userLatitude:0,
      userLongitude:0
    })
    
    vi.setSystemTime(new Date(2024,0,2,8,0,0))
    const {checkIn} = await checkinUseCase.exec({
      gymId: 'gym-01',
      userId: '321',
      userLatitude:0,
      userLongitude:0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('shold not be able to check in distant from the gym', async () => {
    vi.setSystemTime(new Date(2024,0,1,8,0,0))

    gymRepository.create({
      id:'gym-02',
      title:'gym2',
      phone:'',
      description:'',
      latitude: -23.9179446,
      longitude: -52.3446851,
    })

    expect( () => checkinUseCase.exec({
      gymId: 'gym-02',
      userId: '321',
      userLatitude:-24.0334446,
      userLongitude:-52.3730944,
    })).rejects.toBeInstanceOf(MaxDistanceError)
  })
})