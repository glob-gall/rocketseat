import { CheckinRepository } from "@/repositories/check-in-repository"

interface GetUserMetricsRequest {
 userId:string
}
interface FetchUserMetricsResponse {
  checkinsCount: number
}

export class GetUserMetricsUsecase {
  constructor(private checkinsRepository: CheckinRepository){}

  async exec({userId}:GetUserMetricsRequest): Promise<FetchUserMetricsResponse>{
    const checkinsCount = await  this.checkinsRepository.countByUserId(userId)

    return {
      checkinsCount
    }
  }
}