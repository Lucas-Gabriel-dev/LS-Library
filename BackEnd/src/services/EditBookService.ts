import { connect } from "../database/db";
import { v4 as uuid } from "uuid";
import { setDoc, doc, query, collection, where, getDocs } from "firebase/firestore";

interface IEditBookRequest{
    id_book: string;
    bookTitle: string;
    bookAuthor: string;
    pubDate: Date;
    bookCover: string;
    bookDescription: string;
    user_id: string;
}

class EditBookService{
    async execute({ id_book, bookTitle, bookAuthor, pubDate, bookCover, bookDescription, user_id }: IEditBookRequest){
        const Connect = await connect()

        if(!bookTitle || !bookAuthor || !pubDate){
            throw new Error("Fields are not filled")
        }

        if(!user_id){
            throw new Error("User not logged!")
        }

        const books = query(
            collection(Connect, "books"), where("id_book", "==", id_book)
        );

        let bookInfo;

        const querySnapshot = await getDocs(books);
        querySnapshot.forEach((doc) => {
            bookInfo = doc.id;
        });   
        
        if(!bookInfo){
            throw new Error("This book not exist!")
        }

        const user = [
            bookTitle,
            bookAuthor,
            pubDate,
            bookCover,
            bookDescription
        ];

        await setDoc(doc(Connect, "books", bookInfo), {
            id_book: id_book,
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

export { EditBookService }