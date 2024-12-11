import * as BooksServices from '../services/books.services'
import { Request, Response } from 'express'
import { BookDTO, Filter } from '../types'

export const getBooks = async (req: Request, res: Response) => {
    const { year, genre } = req.query

    const books = await BooksServices.getAllBooks(
        {
            year: year,
            genre: genre,
        } as Filter,
        req.query.populate === 'true'
    )
    res.json(books)
}

export const getBookById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const book = BooksServices.getBookById(id)
    res.json(book)
}

export const createBook = async (req: Request, res: Response) => {
    const book = req.body as BookDTO
    try {
        await BooksServices.addBook(book)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Error')
    }
    res.send('Book Created')
}

export const updateBook = async (req: Request, res: Response) => {
    const id = req.params.id
    const book = req.body as BookDTO
    try {
        await BooksServices.updateBook(parseInt(id), book)
        res.send('Book Updated')
    } catch (error: unknown) {
        res.status(400).send(`${error}`)
    }
}
