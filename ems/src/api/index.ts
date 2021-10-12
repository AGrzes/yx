export interface Metadata {
  id: string
  [key: string]: any
}

export interface Store {
  store<T extends Record<string, any>>(idOrMetadata: string | Metadata, document: T): Promise<void>
}

export interface Criteria {}

export interface FieldProjection {}

export interface Projection {
  [field: string]: boolean | FieldProjection
}

export interface Query {
  single<T extends Record<string, any>>(criteria: Criteria, projection: Projection): Promise<T>
  all<T extends Record<string, any>>(criteria: Criteria, projection: Projection): Promise<T[]>
}
