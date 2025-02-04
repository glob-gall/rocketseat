import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('Checkin History (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('shold be able to get checkin history', async () => {
    const { token } = await createAndAuthenticateUser(app)

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

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        }
      ]
    })

    const response = await request(app.server)
    .get('/checkins/history')
    .auth(token, {type:'bearer'})
    .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
          user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
          user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
          user_id: user.id,
      }),
    ])

  })
})