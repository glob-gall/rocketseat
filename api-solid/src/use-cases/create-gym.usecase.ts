
import { Gym } from "@prisma/client"
import { GymRepository } from "@/repositories/gym-repository"

interface CreateGymUsecaseDto {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUsecaseResponse {
  gym: Gym
}

export class CreateGymUseCase {

  constructor(private gymRepository: GymRepository) {}

  async exec({
    description,
    latitude,
    longitude,
    phone,
    title
  }: CreateGymUsecaseDto): Promise<CreateGymUsecaseResponse>{
    const gym = await this.gymRepository.create({
      description,
      latitude,
      longitude,
      phone,
      title
    })

    return {
      gym
    }
  }
}
