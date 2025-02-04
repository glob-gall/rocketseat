import { GymRepository } from "@/repositories/gym-repository"
import { Gym } from "@prisma/client"

interface SearchGymRequest {
 query:string
 page:number
}
interface SearchGymResponse {
  gyms:Gym[]
}

export class SearchGymUsecase {
  constructor(private gymRepository: GymRepository){}

  async exec({page,query}:SearchGymRequest): Promise<SearchGymResponse>{
    const gyms = await this.gymRepository.searchMany(query, page)

    return {
      gyms
    }
  }
}