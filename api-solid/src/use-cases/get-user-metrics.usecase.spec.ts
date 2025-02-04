import { InMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsUsecase } from "./get-user-metrics.usecase";

let checkinRepository: InMemoryCheckinRepository
let getUserMetricsUsecase: GetUserMetricsUsecase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckinRepository()
    getUserMetricsUsecase = new GetUserMetricsUsecase(checkinRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })
    await checkinRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const {checkinsCount} = await getUserMetricsUsecase.exec({
      userId: 'user-01'
    })

    expect(checkinsCount).toEqual(2)
  })

})