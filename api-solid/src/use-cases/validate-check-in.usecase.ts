import { CheckIn } from "@prisma/client";
import { CheckinRepository } from "@/repositories/check-in-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import dayjs from "dayjs";
import { LateCheckinValidationError } from "./errors/late-check-in-validation-error";

interface ValidateCheckinUseCaseRequest {
  checkinId: string
}
interface ValidateCheckinUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckinUseCase {
  constructor(
    private checkinRepository: CheckinRepository,
  ) {}

  async exec({checkinId}:ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse>{
    const checkIn = await this.checkinRepository.findById(checkinId)
    if(!checkIn){
      throw new ResourceNotFoundError()
    }
    
    const minutesInCheckinCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    )

    if (minutesInCheckinCreation > 20 ) {
      throw new LateCheckinValidationError()
    }

    checkIn.validated_at = new Date()
    await this.checkinRepository.save(checkIn)

    return {checkIn}
  }
}