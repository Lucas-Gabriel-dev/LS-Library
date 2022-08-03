import { connect } from "../database/db";
import { collection, query, getDocs } from "firebase/firestore";

class ConsultAllBookService{
    async execute(){
        const Connect = await connect()

        const books = query(
            collection(Connect, "books")
        );

        let bookInfo = []

        const querySnapshot = await getDocs(books);
        querySnapshot.forEach((doc) => {
            var books = bookInfo.push(doc.data());
        });    

        if(!bookInfo[0].book_title){
            throw new Error("No books found")
        }

        return bookInfo
    }
}

export { ConsultAllBookService };