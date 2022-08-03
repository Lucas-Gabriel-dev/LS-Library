import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { AuthenticatorUserController } from "./controller/AuthenticatorUserController";
import { CreateUserController } from "./controller/CreateUserController";
import { AddBookController } from "./controller/AddBookController";
import { ConsultAllBookController } from "./controller/ConsultAllBookController";
import { DetailBookController } from "./controller/DetailBookController";
import { DeleteBookController } from "./controller/DeleteBookController";
import { EditBookController } from "./controller/EditBookController";
import { MyBookController } from "./controller/MyBooksController";

const router = Router();

const createUserController = new CreateUserController();
const authenticatorUserController = new AuthenticatorUserController();
const addBookController = new AddBookController();
const consultAllBookController = new ConsultAllBookController();
const detailBookController = new DetailBookController();
const deleteBookController = new DeleteBookController();
const editBookController = new EditBookController();
const myBookController = new MyBookController();

router.post("/createuser", createUserController.handle)
router.post("/login", authenticatorUserController.handle)

router.get("/consultbook", consultAllBookController.handle)
router.get("/detailBook/:id_book", detailBookController.handle)

router.post("/addbook", ensureAuthenticated, addBookController.handle)
router.delete("/deletebook/:id_book", ensureAuthenticated, deleteBookController.handle)
router.patch("/editbook", ensureAuthenticated, editBookController.handle)
router.get("/mybooks", ensureAuthenticated, myBookController.handle)


router.get("/", (req, res) => {
    res.send({msg: "Hello World"})
})

export { router }