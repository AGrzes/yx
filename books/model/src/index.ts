class Book {
    public title: string
    public authors: Author[]
}

class Author {
    public name: string
    public books: Book[]
    public series: Series[]
}

class Series {
    public name: string
    public books: Book[]
    public authors: Author[]
}

class BookInstance {
    public book: Book
    public library: Library
    public owned: boolean
    public url?: string
    public pages?: number
}

class Library {
    public name: string
    public instances: BookInstance
}

class Reading {
    public book: BookInstance
    public start: string
    public end: string
    public progress: ReadingProgress[]
}

class ReadingProgress {
    public date: string
    public page: number
}

class ReadingPlan {
    public start: string
    public end: string
    public readings: Reading[]
}