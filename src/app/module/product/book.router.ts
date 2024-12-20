import express from "express";
import { bookController } from "./book.controller";

const router = express.Router()

router.get('/products/:productId', bookController.getSingleBook)
router.post('/products', bookController.createBook)
router.put('/products/:productId', bookController.updateBook)
router.delete('/products/:productId', bookController.deleteBook)
router.get('/products', bookController.getAllBooks)

export const bookRouter = router 