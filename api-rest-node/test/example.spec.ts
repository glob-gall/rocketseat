import { expect, beforeAll, afterAll, describe, it, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to creaate a new transaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'new transaction',
      amount: 50,
      type: 'credit',
    })
    expect(response.statusCode).toEqual(201)
  })

  it('should be able to list all transactions', async () => {
    const createResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 50,
        type: 'credit',
      })

    const cookies = createResponse.get('Set-Cookie')

    const listResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    expect(listResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'new transaction',
        amount: 50,
        type: 'credit',
      }),
    ])
  })

  it('should be able to list a specific transaction', async () => {
    const createResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 50,
        type: 'credit',
      })

    const cookies = createResponse.get('Set-Cookie')

    const listResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    const transactionId = listResponse.body.transactions[0].id

    const findByIdResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)

    expect(findByIdResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'new transaction',
        amount: 50,
        type: 'credit',
      }),
    )
  })

  it('should be able to get summary', async () => {
    const createResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 50,
        type: 'credit',
      })

    const cookies = createResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .send({
        title: 'another transaction',
        amount: -40,
        type: 'debit',
      })
      .set('Cookie', cookies)

    const getSummaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(getSummaryResponse.body.summary).toEqual({
      amount: 10,
    })
  })
})
