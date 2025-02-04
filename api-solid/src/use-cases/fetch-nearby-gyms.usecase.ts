import { GymRepository } from "@/repositories/gym-repository"
import { Gym } from "@prisma/client"

interface FetchNearbyGymsRequest {
 userLatitude:number
 userLongitude:number
}
interface FetchNearbyGymsResponse {
  gyms:Gym[]
}

export class FetchNearbyGymsUsecase {
  constructor(private gymRepository: GymRepository){}

  async exec({userLatitude,userLongitude}:FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse>{
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return {
      gyms
    }
  }
}