import { beforeEach,afterEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin.repository";

import { ValidateCheckinUseCase } from "./validate-check-in.usecase";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { LateCheckinValidationError } from "./errors/late-check-in-validation-error";

describe('Check-in use case', ()=> {
  let checkinRepository: InMemoryCheckinRepository
  let validateCheckinUseCase: ValidateCheckinUseCase
  
  beforeEach(async ()=> {
    checkinRepository = new InMemoryCheckinRepository()
    validateCheckinUseCase = new ValidateCheckinUseCase(checkinRepository)


    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shold be able to validate the check-in', async () => {
    const createdCheckIn = await checkinRepository.create({
      gym_id:'gym-01',
      user_id:'user-01',
    })
    
    const {checkIn} = await validateCheckinUseCase.exec({
      checkinId: createdCheckIn.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkinRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('shold be able to validate a invalid check-in', async () => {

   await expect(() => validateCheckinUseCase.exec({
      checkinId: 'invalid-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('shold be able to validate a check-in 20min after its created', async () => {
    vi.setSystemTime(new Date(2024,0,1,13,40))

    const createdCheckIn = await checkinRepository.create({
      gym_id:'gym-01',
      user_id:'user-01',
    })
    
    const twentyOneMinutesInMs = 1000* 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() => validateCheckinUseCase.exec({
      checkinId: createdCheckIn.id 
    })).rejects.toBeInstanceOf(LateCheckinValidationError)

  })


})