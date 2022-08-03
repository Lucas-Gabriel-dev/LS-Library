import { Request, Response } from "express";
import { DeleteBookService } from "../services/DeleteBookService";

class DeleteBookController {
    async handle(request: Request, response: Response){
        const { user_id } = request;
        const { id_book } = request.params;

        const deleteBookService = new DeleteBookService();

        const deleteBook = await deleteBookService.execute({
            user_id,
            id_book
        });

        return response.json(deleteBook);
    }
}

export { DeleteBookController }