import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('Create Checkin (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('shold be able to create checkin', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title:'gym 01',
        description:'description',
        latitude: -11.6884786,
        longitude: -61.1840317,
        phone:'999111999',
      }
    })

    const response = await request(app.server)
    .post(`/gyms/${gym.id}/checkin`)
    .auth(token, {type:'bearer'})
    .send({
      latitude: -11.6884786,
      longitude: -61.1840317,
    })

    expect(response.statusCode).toEqual(201)

  })
})