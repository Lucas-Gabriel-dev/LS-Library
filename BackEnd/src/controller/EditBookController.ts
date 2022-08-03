import { Request, Response } from "express";
import { EditBookService } from "../services/EditBookService";

class EditBookController {
    async handle(request: Request, response: Response){
        const { user_id } = request;
        const { id_book, bookTitle, bookAuthor, pubDate, bookCover, bookDescription } = request.body;

        const editBookService = new EditBookService();

        const infoBook = await editBookService.execute({
            id_book,
            user_id,
            bookTitle,
            bookAuthor,
            pubDate,
            bookCover,
            bookDescription
        });

        return response.json(infoBook);
    }
}

export { EditBookController }