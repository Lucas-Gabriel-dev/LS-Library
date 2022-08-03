import { Request, Response } from "express";
import { ConsultAllBookService } from "../services/ConsultAllBookService";

class ConsultAllBookController {
    async handle(request: Request, response: Response){
        const consultAllBookService = new ConsultAllBookService();

        const infoAllBook = await consultAllBookService.execute();

        return response.json(infoAllBook);
    }
}

export { ConsultAllBookController }