import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Search Gym (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('shold be able to search gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
    .post('/gyms')
    .auth(token, {type:'bearer'})
    .send({
      title:'gym 01',
      description:'description',
      latitude: 0,
      longitude: 0,
      phone:'999111999',
    })

    await request(app.server)
    .post('/gyms')
    .auth(token, {type:'bearer'})
    .send({
      title:'gym 02',
      description:'description',
      latitude: 0,
      longitude: 0,
      phone:'999111999',
    })


    const response = await request(app.server)
    .get('/gyms/search')
    .auth(token, {type:'bearer'})
    .query({
      query: '02'
    })
    .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title:'gym 02'
      })
    ])

  })
})