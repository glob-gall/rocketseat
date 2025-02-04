import { beforeEach, describe, expect, it } from "vitest";
import { ImMemoryGymRepository } from "@/repositories/in-memory/im-memory-gym.repository";
import { FetchNearbyGymsUsecase } from "./fetch-nearby-gyms.usecase";

let gymRepository: ImMemoryGymRepository
let fetchNearbyGyms: FetchNearbyGymsUsecase

describe('Get nearby gyms Use Case', () => {
  beforeEach(async () => {
    gymRepository = new ImMemoryGymRepository()
    fetchNearbyGyms = new FetchNearbyGymsUsecase(gymRepository)
  })

  it('should be able fetch nearby gyms', async () => {
    gymRepository.create({
      title:'close-by-gym',
      description:'description',
      latitude:-11.6876443,
      longitude:-61.1805887,
      phone:'9999999'
    })
    gymRepository.create({
      title:'far-away-gym',
      description:'description',
      latitude:-11.4330096,
      longitude:-61.4824281,
      phone:'9999999'
    })

    const {gyms} = await fetchNearbyGyms.exec({
      userLatitude: -11.6884786,
      userLongitude: -61.1840317
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title:'close-by-gym'}),
    ])
  })

})