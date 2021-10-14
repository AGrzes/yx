export interface Metadata {
  id: string
  [key: string]: any
}

export interface Store {
  store<T extends Record<string, any>>(idOrMetadata: string | Metadata, document: T): Promise<void>
}

export interface Criteria {}

export interface FieldProjection extends Projection {}

export interface LookupProjection extends FieldProjection {
  $lookup?: {
    criteria: Criteria
  }
}

export interface Projection {}

export interface FieldsProjection extends Projection {
  $fields: {
    [field: string]: boolean | Projection
  }
}

export interface Query {
  single<T extends Record<string, any>>(criteria: Criteria, projection: Projection): Promise<T>
  all<T extends Record<string, any>>(criteria: Criteria, projection: Projection): Promise<T[]>
}

export function isFieldsProjection(projection: Projection): projection is FieldsProjection {
  return !!(projection as FieldsProjection).$fields
}