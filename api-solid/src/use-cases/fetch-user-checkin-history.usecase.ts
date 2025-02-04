import { CheckIn } from "@prisma/client";
import { CheckinRepository } from "@/repositories/check-in-repository";

interface FetchUserCheckinHistoryRequest {
  userId: string,
  page: number
}
interface FetchUserCheckinHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckinHistoryUseCase {
  constructor(
    private checkinRepository: CheckinRepository,
  ) {}

  async exec({userId, page}:FetchUserCheckinHistoryRequest): Promise<FetchUserCheckinHistoryResponse>{
    const checkIns = await this.checkinRepository.findManyByUserId(userId, page)
    
    return {checkIns}
  }
}