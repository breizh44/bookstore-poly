import { Router } from 'express'
import * as AuthorsController from '../controllers/authors.controllers'

const router = Router()

router.get('/authors', AuthorsController.getAuthors)

router.get('/authors/:id', AuthorsController.getAuthorById)

export default router
