import { UserRepository } from "@/repositories/user-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { compare } from "bcryptjs";
import { CheckIn, User } from "@prisma/client";
import { CheckinRepository } from "@/repositories/check-in-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { getDistanceBetweenCoordnates } from "@/utils/get-distance-between-coordinate";
import { MaxDistanceError } from "./errors/max-distance";
import { MaxNumberOfCheckinsError } from "./errors/max-number-of-checkins";

interface CheckinUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}
interface CheckinUseCaseResponse {
  checkIn: CheckIn
}

export class CheckinUseCase {
  constructor(
    private checkinRepository: CheckinRepository,
    private gymRepository: GymRepository
  ) {}

  async exec({gymId,userId, userLatitude,userLongitude}:CheckinUseCaseRequest): Promise<CheckinUseCaseResponse>{
    const gym = await this.gymRepository.findById(gymId)
    if(!gym){
      throw new ResourceNotFoundError()
    }
    
    const distance = getDistanceBetweenCoordnates({
      latitude:userLatitude,
      longitude:userLongitude
    },
    {
       latitude: gym.latitude.toNumber(),
       longitude: gym.longitude.toNumber()
    })

    const MAX_DISTANCE = 0.1
    if (distance > MAX_DISTANCE) {
      throw new MaxDistanceError()
    }

    const checkinOnSameDate = await this.checkinRepository.findByUserIdOnDate(userId, new Date())

    if(checkinOnSameDate) {
      throw new MaxNumberOfCheckinsError()
    }

    const checkIn = await this.checkinRepository.create({
      gym_id: gymId,
      user_id: userId
    })
    
    return {checkIn}
  }
}