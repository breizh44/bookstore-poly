import type { Book } from './book.type'

export interface Author {
  id: number
  name: string
  book: Book[]
}
