import { Criteria, Metadata, Projection, Query, Store } from '../api'
import _ from 'lodash'

export class MemoryEMS implements Store, Query {
  private data: Record<string, [Metadata, Record<string, any>]> = {}

  private projection(projection: Projection): (document: Record<string, any>) => Record<string, any> {
    if (projection) {
      return (document) => _.pickBy(document, (value, key) => projection[key])
    } else {
      return _.identity
    }
  }

  async store<T extends Record<string, any>>(idOrMetadata: string | Metadata, document: T): Promise<void> {
    const id = typeof idOrMetadata === 'string' ? idOrMetadata : idOrMetadata.id
    const metadata = typeof idOrMetadata === 'string' ? { id } : idOrMetadata
    this.data[id] = [metadata, document]
  }
  async single<T extends Record<string, any>>(criteria: Criteria, projection: Projection): Promise<T> {
    return this.projection(projection)(
      _(this.data)
        .map(([metadata, document]) => document)
        .find((document) => _.isMatch(document, criteria))
    ) as T
  }
  async all<T extends Record<string, any>>(criteria: Criteria, projection: Projection): Promise<T[]> {
    return _(this.data)
      .map(([metadata, document]) => document)
      .filter((document) => _.isMatch(document, criteria))
      .map(this.projection(projection))
      .value() as T[]
  }
}
