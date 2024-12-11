import { Router } from 'express'
import * as BooksControllers from '../controllers/books.controllers'

const router = Router()

router.get('/books', BooksControllers.getBooks)

router.get('/books/:id', BooksControllers.getBookById)

router.post('/books', BooksControllers.createBook)

router.put('/books/:id', BooksControllers.updateBook)

export default router
