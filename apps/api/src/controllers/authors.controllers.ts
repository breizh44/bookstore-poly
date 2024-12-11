import * as AuthorsService from '../services/authors.services'
import { Request, Response } from 'express'

export const getAuthors = async (req: Request, res: Response) => {
    const books = await AuthorsService.getAllAuthors(
        req.query.populate === 'true'
    )
    res.json(books)
}

export const getAuthorById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const book = await AuthorsService.getAuthorById(id)
    res.json(book)
}
