import { BookDTO, Filter } from '../types'
import { Book } from '../entities/book.entity'

import { DI } from '../index'
import { wrap } from '@mikro-orm/core'

export const getAllBooks = async (
    filters: Filter,
    populate: boolean = false
): Promise<Book[]> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {}
    Object.entries(filters).reduce((query, [key, value]) => {
        if (value) {
            query[key] = value
        }
        return query
    }, query)
    return await DI.em.find(
        Book,
        query,
        populate ? { populate: ['publisher', 'author'] } : {}
    )
}

export const getBookById = async (id: number): Promise<Book | null> => {
    return await DI.em.findOne(Book, id)
}

export const addBook = async (book: BookDTO) => {
    try {
        const newBook = DI.em.create(Book, book)
        await DI.em.flush()
        return newBook
    } catch (error: unknown) {
        throw new Error(`Error creating book: ${error}`)
    }
}

export const updateBook = async (id: number, book: BookDTO) => {
    const existingBook = await DI.em.findOne(Book, { id: id })
    if (!existingBook) {
        throw new Error('Book not found')
        return
    }
    wrap(existingBook).assign(book)
    await DI.em.flush()
    return existingBook
}
