import { connect } from "../database/db";
import { collection, query, getDocs, where } from "firebase/firestore";

interface IDetailBookRequest{
    id_book: string;
}

class DetailBookService{
    async execute({ id_book }: IDetailBookRequest){
        const Connect = await connect()

        const books = query(
            collection(Connect, "books"), where("id_book", "==", id_book)
        );
        
        let bookInfo;

        const querySnapshot = await getDocs(books);
        querySnapshot.forEach((doc) => {
            bookInfo = doc.data();
        });    
        console.log(bookInfo)

        if(!bookInfo){
            throw new Error("No books found")
        }

        const info = [
            {
            bookTitle: bookInfo.book_title,
            bookAuthor: bookInfo.book_author,
            bookDate: bookInfo.pub_date,
            bookDescription: bookInfo.book_description,
            bookCover: bookInfo.book_cover
        }]

        return info
    }
}

export { DetailBookService }