import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('Validate Checkin (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('shold be able to validate checkin', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        title:'gym 01',
        description:'description',
        latitude: -11.6884786,
        longitude: -61.1840317,
        phone:'999111999',
      }
    })

    let checkin = await prisma.checkIn.create({
      data: {
          gym_id: gym.id,
          user_id: user.id,
        }
    })

    const response = await request(app.server)
    .patch(`/checkins/${checkin.id}/validate`)
    .auth(token, {type:'bearer'})
    .send()

    expect(response.statusCode).toEqual(204)
    
    checkin = await prisma.checkIn.findUniqueOrThrow({
      where: {id: checkin.id}
    })
    expect(checkin.validated_at).toEqual(
      expect.any(Date)
    )


  })
})