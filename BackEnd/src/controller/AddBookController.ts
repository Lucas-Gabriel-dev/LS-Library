import { Request, Response } from "express";
import { AddBookService } from "../services/AddBookService";

class AddBookController {
    async handle(request: Request, response: Response){
        const { user_id } = request
        const { bookTitle, bookAuthor, pubDate, bookCover, bookDescription, } = request.body;

        const addBookService = new AddBookService();

        const infoPoll = await addBookService.execute({
            bookTitle,
            bookAuthor,
            pubDate,
            bookCover,
            bookDescription,
            user_id
        });

        return response.json(infoPoll);
    }
}

export { AddBookController }