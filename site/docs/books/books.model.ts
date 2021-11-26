import { useAll } from '../../src/components/EMS'

export class Book {
  name: string
  author?: Author
  series?: Series
}

export class Author {
  name: string
  series?: Series[]
  books?: Book[]
}

export class Series {
  name: string
  author?: Author
  books?: Book[]
}

export class BookModel {
  public books: Record<string, Book> = {}
  public authors: Record<string, Author> = {}
  public series: Record<string, Series> = {}

  constructor(data: any[]) {
    data?.forEach((item) => this.register(item))
  }

  private register(item: { kind: string }) {
    switch (item.kind) {
      case 'Book':
        this.registerBook(item)
        break
      case 'Author':
        this.registerAuthor(item)
        break
      case 'Series':
        this.registerSeries(item)
        break
    }
  }

  private registerBook(item: any) {
    const book = new Book()
    Object.assign(book, item)
    if (item.author) {
      const author = this.registerAuthor(item.author)
      author.books = author.books || []
      author.books.push(book)
      book.author = author
    }
    if (item.series) {
      const series = this.registerSeries(item.author)
      series.books = series.books || []
      series.books.push(book)
      book.series = series
    }
    this.books[book.name] = book
    return book
  }
  private registerAuthor(item: any) {
    const author = new Author()
    Object.assign(author, item)
    if (item.books) {
      author.books = item.books.map((b) => {
        const book = this.registerBook(b)
        book.author = author
        return book
      })
    }
    if (item.series) {
      author.series = item.series.map((s) => {
        const series = this.registerSeries(s)
        series.author = author
        return series
      })
    }
    this.authors[author.name] = author
    return author
  }
  private registerSeries(item: any) {
    const series = new Series()
    Object.assign(series, item)
    if (item.books) {
      series.books = item.books.map((b) => {
        const book = this.registerBook(b)
        book.series = series
        return book
      })
    }
    if (item.series) {
      const author = this.registerAuthor(item.author)
      author.series = author.series || []
      author.series.push(series)
      series.author = author
    }
    this.series[series.name] = series
    return series
  }
}

export function useBooks<T>(): BookModel {
  const data = useAll<any>()
  return new BookModel(data)
}
