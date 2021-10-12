import 'mocha'
import { MemoryEMS } from '../../src/memory'
import { expect } from 'chai'

describe('MemoryEMS', () => {
  it('should return stored document', async () => {
    const doc = { a: 'b' }
    const ems = new MemoryEMS()
    await ems.store('1', doc)
    expect(await ems.single({ a: 'b' }, {})).to.be.deep.equal(doc)
  })

  it('should find stored document', async () => {
    const doc = { a: 'b' }
    const ems = new MemoryEMS()
    await ems.store('1', doc)
    await ems.store('2', { c: 'd' })
    expect(await ems.all({ a: 'b' }, {})).to.be.deep.equal([doc])
  })
})
