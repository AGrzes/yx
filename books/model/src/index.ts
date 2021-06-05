import 'reflect-metadata'
import {Field, ObjectType} from 'type-graphql'

@ObjectType()
export class Book {
    @Field()
    public title: string
    @Field(()=>[Author])
    public authors: Author[]
}

@ObjectType()
export class Author {
    @Field()
    public name: string
    @Field(()=>[Book])
    public books: Book[]
    @Field(()=>Series)
    public series: Series[]
}

@ObjectType()
export class Series {
    @Field()
    public name: string
    @Field(()=>[Book])
    public books: Book[]
    @Field(()=>[Author])
    public authors: Author[]
}

@ObjectType()
export class BookInstance {
    @Field(()=>Book)
    public book: Book
    @Field(()=>Book)
    public library: Library
    @Field()
    public owned: boolean
    @Field({nullable:true})
    public url?: string
    @Field({nullable:true})
    public pages?: number
}

@ObjectType()
export class Library {
    @Field()
    public name: string
    @Field(()=>BookInstance)
    public instances: BookInstance
}

@ObjectType()
export class Reading {
    @Field(()=>BookInstance)
    public book: BookInstance
    @Field({nullable:true})
    public start?: string
    @Field({nullable:true})
    public end?: string
    @Field(()=>[ReadingProgress])
    public progress: ReadingProgress[]
}

@ObjectType()
export class ReadingProgress {
    @Field()
    public date: string
    @Field()
    public page: number
}

@ObjectType()
export class ReadingPlan {
    @Field()
    public start: string
    @Field()
    public end?: string
    @Field(()=>[Reading])
    public readings: Reading[]
}