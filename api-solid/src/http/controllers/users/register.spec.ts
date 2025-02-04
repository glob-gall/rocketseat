import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";

describe('Register (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('shold be able to register', async () => {
    const response = await request(app.server)
    .post('/users')
    .send({
      name:'Teste',
      email:'Teste@email.com',
      password:'12345678'
    })

    expect(response.statusCode).toEqual(201)
  })
})