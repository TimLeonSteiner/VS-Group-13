import request from 'supertest'

const baseUrl = 'http://localhost:3000'

describe('Ratings API (E2E)', () => {
  it('sollte 400 zurückgeben bei fehlenden Feldern', async () => {
    const response = await request(baseUrl)
      .post('/api/ratings')
      .send({}) // leere Daten
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Missing required fields')
  })
})
