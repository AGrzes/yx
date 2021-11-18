import 'mocha'
import { isFieldsProjection } from '../src'
import { expect } from 'chai'

describe('isFieldsProjection', () => {
  it('should recognize field projection', async () => {
    expect(isFieldsProjection({ $fields: {} })).to.be.true
    expect(isFieldsProjection({ $notFields: {} })).to.be.false
  })
})
