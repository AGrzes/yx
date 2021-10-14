import { Criteria, Metadata, Projection, Query, Store } from '../api'
import _ from 'lodash'

export class MemoryEMS implements Store, Query {
  private data: Record<string, [Metadata, Record<string, any>]> = {}

  private projection(projection: Projection): (document: Record<string, any>) => Record<string, any> {
    if (projection) {
      return (document) =>
        _.mapValues(projection, (value, key) => {
          if (_.isBoolean(value)) {
            return document[key]
          } else if (_.isObject(value)) {
            return this.projection(value as Projection)(document[key])
          }
        })
    } else {
      return _.identity
    }
  }

  private selection(criteria: Criteria): (document: Record<string, any>) => boolean {
    return (document) => _.isMatch(document, criteria)
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
        .find(this.selection(criteria))
    ) as T
  }
  async all<T extends Record<string, any>>(criteria: Criteria, projection: Projection): Promise<T[]> {
    return _(this.data)
      .map(([metadata, document]) => document)
      .filter(this.selection(criteria))
      .map(this.projection(projection))
      .value() as T[]
  }
}
