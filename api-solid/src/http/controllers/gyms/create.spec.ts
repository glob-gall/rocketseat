import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Create Gym (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('shold be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
    .post('/gyms')
    .auth(token, {type:'bearer'})
    .send({
      title:'gym 01',
      description:'description',
      latitude: 0,
      longitude: 0,
      phone:'999111999',
    })

    expect(response.statusCode).toEqual(201)

  })
})