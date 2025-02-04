import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymUsecase } from "./search-gyms.usecase";
import { ImMemoryGymRepository } from "@/repositories/in-memory/im-memory-gym.repository";

let gymRepository: ImMemoryGymRepository
let searchGymUsecase: SearchGymUsecase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    gymRepository = new ImMemoryGymRepository()
    searchGymUsecase = new SearchGymUsecase(gymRepository)
  })

  it('should be able to filter the gym by name', async () => {
    gymRepository.create({
      title:'my gym',
      description:'description',
      latitude:0,
      longitude:0,
      phone:'9999999'
    })
    gymRepository.create({
      title:'my gym 02',
      description:'description',
      latitude:0,
      longitude:0,
      phone:'9999999'
    })

    const {gyms} = await searchGymUsecase.exec({
      query:'02',
      page:1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title:'my gym 02'}),
    ])
  })

  it('should be able to paginate gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title:`Gym ${i}`,
        description:'description',
        latitude:0,
        longitude:0,
        phone:'9999999'
      })
    }

    const {gyms} = await searchGymUsecase.exec({
      query:'Gym',
      page:2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title:'Gym 21'}),
      expect.objectContaining({ title:'Gym 22'}),
    ])
  })

})