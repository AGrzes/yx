import { Criteria, Metadata, Projection, Query, Store } from '../api'
import _ from 'lodash'

export class MemoryEMS implements Store, Query {
  private data: Record<string, [Metadata, Record<string, any>]> = {}

  async store<T extends Record<string, any>>(idOrMetadata: string | Metadata, document: T): Promise<void> {
    const id = typeof idOrMetadata === 'string' ? idOrMetadata : idOrMetadata.id
    const metadata = typeof idOrMetadata === 'string' ? { id } : idOrMetadata
    this.data[id] = [metadata, document]
  }
  async single<T extends Record<string, any>>(criteria: Criteria, projection: Projection): Promise<T> {
    return _(this.data)
      .map(([metadata, document]) => document)
      .find((document) => _.isEqual(criteria, document)) as T
  }
  async all<T extends Record<string, any>>(criteria: Criteria, projection: Projection): Promise<T[]> {
    return _(this.data)
      .map(([metadata, document]) => document)
      .filter((document) => _.isEqual(criteria, document))
      .value() as T[]
  }
}
