import { InMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchUserCheckinHistoryUseCase } from "./fetch-user-checkin-history.usecase";

describe('fetch user checkin use case', ()=> {
  let checkinRepository: InMemoryCheckinRepository
  let fetchUserCheckinUsecase: FetchUserCheckinHistoryUseCase

  beforeEach(() => {
    checkinRepository = new InMemoryCheckinRepository()
    fetchUserCheckinUsecase = new FetchUserCheckinHistoryUseCase(checkinRepository)
  })

  it('should be able to get user checkin history', async () =>{
    console.log({checkinRepository});
    
    await checkinRepository.create({
      gym_id:'gym-01',
      user_id: 'user-01'
    })
    
    await checkinRepository.create({
      gym_id:'gym-02',
      user_id: 'user-01'
    })

    const {checkIns} = await fetchUserCheckinUsecase.exec({userId:'user-01',page:1})
  
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'gym-01'}),
      expect.objectContaining({gym_id: 'gym-02'})
    ])
  })

  it('should be able to fetch paginated check-in history', async () =>{

    for (let i = 1; i <= 22; i++) {
      await checkinRepository.create({
        gym_id:`gym-${i}`,
        user_id: 'user-01'
      })  
    }

    const {checkIns} = await fetchUserCheckinUsecase.exec({userId:'user-01',page:2})
  
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'gym-21'}),
      expect.objectContaining({gym_id: 'gym-22'})
    ])
  })
})