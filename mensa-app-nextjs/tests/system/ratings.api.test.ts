/** @jest-environment node */
import mongoose from 'mongoose'
import { POST } from '@/app/api/ratings/route'

beforeAll(() => mongoose.connect(process.env.MONGO_URL!))
afterAll(()  => mongoose.connection.close())

describe('Ratings‑API (System)', () => {
  it('gibt 400 zurück, wenn Felder fehlen', async () => {
    const req = new Request('http://localhost/api/ratings', {
      method: 'POST',
      body:   JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    })

    const res = (await POST(req as any)) as Response
    expect(res.status).toBe(400)
  })
})
