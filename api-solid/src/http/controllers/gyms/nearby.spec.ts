// gymRepository.create({
//   title:'close-by-gym',
//   description:'description',
//   latitude:-11.6876443,
//   longitude:-61.1805887,
//   phone:'9999999'
// })
// gymRepository.create({
//   title:'far-away-gym',
//   description:'description',
//   latitude:-11.4330096,
//   longitude:-61.4824281,
//   phone:'9999999'
// })

// const {gyms} = await fetchNearbyGyms.exec({
//   userLatitude: -11.6884786,
//   userLongitude: -61.1840317
// })

// expect(gyms).toHaveLength(1)
// expect(gyms).toEqual([
//   expect.objectContaining({ title:'close-by-gym'}),
// ])

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Nearby Gym (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('shold be able to find nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
    .post('/gyms')
    .auth(token, {type:'bearer'})
    .send({
      title:'close-by-gym',
      description:'description',
      latitude:-11.6876443,
      longitude:-61.1805887,
      phone:'9999999'
    })

    await request(app.server)
    .post('/gyms')
    .auth(token, {type:'bearer'})
    .send({
      title:'far-away-gym',
      description:'description',
      latitude:-11.4330096,
      longitude:-61.4824281,
      phone:'9999999'
    })


    const response = await request(app.server)
    .get('/gyms/nearby')
    .auth(token, {type:'bearer'})
    .query({
      latitude: -11.6884786,
      longitude: -61.1840317
    })
    .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title:'close-by-gym'
      })
    ])

  })
})