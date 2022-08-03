import { Request, Response } from "express";
import { MyBookService } from "../services/MyBooksService";

class MyBookController {
    async handle(request: Request, response: Response){
        const { user_id } = request;

        const myBookService = new MyBookService();

        const infoPoll = await myBookService.execute({
            user_id
        });

        return response.json(infoPoll);
    }
}

export { MyBookController }