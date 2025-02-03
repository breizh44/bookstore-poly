import express, { Response, Request } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import booksRoutes from './routes/books.routes'
import authorsRoutes from './routes/authors.routes'
import { EntityManager, MikroORM, RequestContext } from '@mikro-orm/core'
import config from './mikro-orm.config'
import { Server } from 'socket.io'
import { createServer } from 'http'

dotenv.config()

const port = process.env.PORT || 4000
const portWS = process.env.PORT_WS || 1000

export const DI = {} as {
    orm: MikroORM
    em: EntityManager
}

export const init = async () => {
    DI.orm = await MikroORM.init(config)

    DI.em = DI.orm.em

    const app = express()

    app.use(cors())

    app.use((req, res, next) => RequestContext.create(DI.em, next))

    app.use(express.json())

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World!')
    })

    app.use(booksRoutes)
    app.use(authorsRoutes)

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })

    const server = createServer(app)
    const io = new Server(server, { cors: { origin: '*' } })

    io.on('connection', (socket) => {
        console.log('a user connected')

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })

        socket.on('chat', (message) => {
            console.log('message received back end:', message)
            io.emit('chat', message)
        })
    })

    server.listen(portWS, () => {
        console.log(`Websocket listening on port ${portWS}`)
    })
}

init()
