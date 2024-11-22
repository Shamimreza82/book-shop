import express, { Request, Response } from 'express'
import { bookRouter } from './app/module/product/book.router'
import { orderRouter } from './app/module/order/order.router'


const app = express()


app.use(express.json())

app.use('/api/',  bookRouter)

app.use('/api/',  orderRouter)

app.get('/', async (req: Request, res: Response) => {
    console.log("Book Shop app in running");
    res.send({message: "Book Shop app in running"})
})


export default app