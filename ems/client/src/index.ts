import { Store, Query, Metadata, Criteria, Projection } from '@agrzes/yx-ems-api'
import axios,{ Axios} from 'axios'

export class EmsStoreClient implements Store {
  constructor(private client: Axios) {}

  async store<T extends Record<string, any>>(idOrMetadata: string | Metadata, document: T): Promise<void> {
    const id = typeof idOrMetadata === 'string' ? idOrMetadata : undefined
    const metadata = typeof idOrMetadata !== 'string' ? idOrMetadata : undefined
    await this.client.post('/', { id, metadata, document })
  }
}

export interface ClientOptions {
  signal?: AbortSignal
}

export interface QueryClient extends Query {
  single<T extends Record<string, any>>(criteria: Criteria, projection: Projection, options?: ClientOptions): Promise<T>
  all<T extends Record<string, any>>(criteria: Criteria, projection: Projection, options?: ClientOptions): Promise<T[]>
}

export class EmsQueryClient implements Query {
  constructor(private client: Axios) {}
  async single<T extends Record<string, any>>(
    criteria: Criteria,
    projection: Projection,
    { signal }: ClientOptions = {}
  ): Promise<T> {
    return (await this.client.post('/_single', { criteria, projection }, { signal })).data as T
  }
  async all<T extends Record<string, any>>(
    criteria: Criteria,
    projection: Projection,
    { signal }: ClientOptions = {}
  ): Promise<T[]> {
    return (await this.client.post('/_all', { criteria, projection }, { signal })).data as T[]
  }
}

export interface Options {
  url: string
}

export function store(options: Options): Store {
  return new EmsStoreClient(axios.create({ baseURL: options.url }))
}

export function query(options: Options): Query {
  return new EmsQueryClient(axios.create({ baseURL: options.url }))
}
