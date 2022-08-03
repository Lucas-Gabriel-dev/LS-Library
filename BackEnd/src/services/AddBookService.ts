import { connect } from "../database/db";
import { v4 as uuid } from "uuid";
import { collection, addDoc } from "firebase/firestore";

interface ICreateBookRequest{
    bookTitle: string;
    bookAuthor: string;
    pubDate: Date;
    bookCover: string;
    bookDescription: string;
    user_id: string;
}

class AddBookService{
    id: string;
    async execute({ bookTitle, bookAuthor, pubDate, bookCover, bookDescription, user_id }: ICreateBookRequest){
        const Connect = await connect()

        if(!bookTitle || !bookAuthor || !pubDate){
            throw new Error("Fields are not filled")
        }

        if(!user_id){
            throw new Error("User not logged!")
        }

        if(!this.id){
            this.id = uuid()
        }

        const user = [
            bookTitle,
            bookAuthor,
            pubDate,
            bookCover,
            bookDescription
        ];

        const docRef = await addDoc(collection(Connect, "books"), {
            id_book: this.id,
            id_user: user_id,
            book_title: bookTitle,
            book_author: bookAuthor,
            pub_date: pubDate,
            book_cover: bookCover,
            book_description: bookDescription
        });
        
        return (user)
    }
}

export { AddBookService }