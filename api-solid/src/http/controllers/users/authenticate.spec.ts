import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";

describe('Authenticate (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('shold be able to authenticate', async () => {
    await request(app.server)
    .post('/users')
    .send({
      name:'Teste',
      email:'Teste@email.com',
      password:'12345678'
    })

    const response = await request(app.server)
    .post('/sessions')
    .send({

      email:'Teste@email.com',
      password:'12345678'
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})