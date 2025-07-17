/** @jest-environment node */
import Rating from '@/lib/models/Rating'

// wir wollen z.B. überprüfen, dass .create aufgerufen wird
describe('Mongoose Spy auf Rating Model', () => {
  it('sollte Rating.create mit den richtigen Parametern aufrufen', async () => {
    // 🛠 Spy erstellen
    const spy = jest.spyOn(Rating, 'create').mockResolvedValue({
      _id: '123',
      menuEntry: 'menu123',
      user: 'user123',
      stars: 5,
    } as any)

    // Aktion ausführen
    await Rating.create({ menuEntry: 'menu123', user: 'user123', stars: 5 })

    // Erwartung
    expect(spy).toHaveBeenCalledWith({
      menuEntry: 'menu123',
      user: 'user123',
      stars: 5,
    })

    // Spy aufräumen
    spy.mockRestore()
  })

  it('sollte auch find() spyen können', async () => {
    const spyFind = jest.spyOn(Rating, 'find').mockReturnValue({
      populate: jest.fn().mockResolvedValue([{ stars: 4 }]),
    } as any)

    // Aufruf simulieren
    await (Rating.find as any)()

    expect(spyFind).toHaveBeenCalled()

    spyFind.mockRestore()
  })
})
