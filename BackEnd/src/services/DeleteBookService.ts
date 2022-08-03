import { connect } from "../database/db";
import { collection, query, getDocs, where, doc, deleteDoc } from "firebase/firestore";

interface IDeleteBookRequest{
    user_id: string;
    id_book: string;
}

class DeleteBookService{
    async execute({ id_book, user_id }: IDeleteBookRequest){
        const Connect = await connect()

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

        await deleteDoc(doc(Connect, "books", bookInfo));
        
        return 
    }
}

export { DeleteBookService }