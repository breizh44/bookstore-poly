import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { faker } from '@faker-js/faker'
import { Book } from '../entities/book.entity'
import { Publisher } from '../entities/publisher.entity'
import { Author } from '../entities/author.entity'

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const publishers: Publisher[] = []
        for (let i = 0; i < 10; i++) {
            const publisher = new Publisher()
            publisher.name = faker.book.publisher()
            publisher.adress = faker.location.streetAddress()
            publishers.push(publisher)
        }

        const authors: Author[] = []
        for (let i = 0; i < 10; i++) {
            const author = new Author()
            author.name = faker.book.author()
            authors.push(author)
        }

        const books: Book[] = []
        for (let i = 0; i < 50; i++) {
            const book = new Book()
            book.title = faker.book.title()
            const author = faker.helpers.arrayElement(authors)
            book.author.add(author)
            author.book.add(book)
            book.year = faker.date.past({ years: 150 }).getFullYear()
            book.genre = faker.book.genre()
            book.publisher = faker.helpers.arrayElement(publishers)
            books.push(book)
        }

        await em.persistAndFlush(books)
    }
}
