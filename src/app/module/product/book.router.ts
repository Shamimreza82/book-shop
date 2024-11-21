import express from "express";
import { bookController } from "./book.controller";

const router = express.Router()

router.get('/products/:productId', bookController.getSingleBook)
router.post('/create-product', bookController.createBook)
router.put('/products/:productId', bookController.updateBook)
router.delete('/products/:productId', bookController.deleteBook)

export const bookRouter = router 