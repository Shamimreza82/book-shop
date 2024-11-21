import express, { Request, Response } from 'express'

const app = express()


app.use(express.json())

app.get('/', async (req: Request, res: Response) => {
    console.log("Book Shop app in running");
    res.send({message: "Book Shop app in running"})
})


export default app