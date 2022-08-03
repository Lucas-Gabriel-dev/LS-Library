import { connect } from "../database/db";
import { collection, query, getDocs, where } from "firebase/firestore";

interface IMyBookRequest{
    user_id: string;
}

class MyBookService{
    async execute({ user_id }: IMyBookRequest){
        const Connect = await connect()

        const books = query(
            collection(Connect, "books"), where("id_user", "==", user_id)
        );
        
        let bookInfo = [];

        const querySnapshot = await getDocs(books);
        querySnapshot.forEach((doc) => {
            var books = bookInfo.push(doc.data());
        });    

        if(bookInfo.length < 1){
            throw new Error("No books found")
        }

        return bookInfo
    }
}

export { MyBookService }