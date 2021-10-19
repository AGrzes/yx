import { Store, Query, Metadata, Criteria, Projection } from '@agrzes/yx-ems-api'
import { Axios } from 'axios'

export class EmsStoreClient implements Store {
  constructor(private client: Axios) {}

  async store<T extends Record<string, any>>(idOrMetadata: string | Metadata, document: T): Promise<void> {
    const id = typeof idOrMetadata === 'string' ? idOrMetadata : undefined
    const metadata = typeof idOrMetadata !== 'string' ? idOrMetadata : undefined
    await this.client.post('/', { id, metadata, document })
  }
}

export class EmsQueryClient implements Query {
  constructor(private client: Axios) {}
  async single<T extends Record<string, any>>(criteria: Criteria, projection: Projection): Promise<T> {
    return (await this.client.post('/_single', { criteria, projection })).data as T
  }
  async all<T extends Record<string, any>>(criteria: Criteria, projection: Projection): Promise<T[]> {
    return (await this.client.post('/_all', { criteria, projection })).data as T[]
  }
}

export interface Options {
  url: string
}

export function store(options: Options): Store {
  return new EmsStoreClient(new Axios({ baseURL: options.url }))
}

export function query(options: Options): Query {
  return new EmsQueryClient(new Axios({ baseURL: options.url }))
}
