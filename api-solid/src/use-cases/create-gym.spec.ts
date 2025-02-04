import { beforeEach, describe, expect, it } from "vitest";
import { ImMemoryGymRepository } from "@/repositories/in-memory/im-memory-gym.repository";
import { CreateGymUseCase } from "./create-gym.usecase";

describe('create gym use case', () => {
  let gymRepository:ImMemoryGymRepository
  let createGymUseCase: CreateGymUseCase

  beforeEach(() => {
    gymRepository = new ImMemoryGymRepository()
    createGymUseCase = new CreateGymUseCase(gymRepository)
  })

  it('shold be able to create gym', async () => {
    const {gym} = await createGymUseCase.exec({
      title:'gym',
      description:'description',
      latitude:0,
      longitude:0,
      phone:'9999999'
    })
    
    expect(gym.id).toEqual(expect.any(String))
  })
})