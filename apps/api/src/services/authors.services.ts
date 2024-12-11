import { Author } from '../entities/author.entity'

import { DI } from '../index'

export const getAllAuthors = async (
    populate: boolean = false
): Promise<Author[]> => {
    return await DI.em.find(Author, {}, populate ? { populate: ['book'] } : {})
}

export const getAuthorById = async (id: number): Promise<Author | null> => {
    return await DI.em.findOne(Author, { id: id })
}
