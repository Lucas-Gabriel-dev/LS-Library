import { Request, Response } from "express";
import { DetailBookService } from "../services/DetailBookService";

class DetailBookController {
    async handle(request: Request, response: Response){
        const { id_book } = request.params;

        const detailBookService = new DetailBookService();

        const infoPoll = await detailBookService.execute({
            id_book
        });

        return response.json(infoPoll);
    }
}

export { DetailBookController }