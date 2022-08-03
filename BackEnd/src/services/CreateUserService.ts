import { connect } from "../database/db";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { sign } from "jsonwebtoken";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";

interface IUserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    id: string;
    async execute({ name, email, password }: IUserRequest){
        const Connect = await connect();

        if(!email){
            throw new Error("Email incorrect"); 
        }

        const user = query(
            collection(Connect, "users"), where("email_user", "==", email)
        );
        
        let userEmail;

        const querySnapshot = await getDocs(user);
        querySnapshot.forEach((doc) => {
            userEmail = doc.data().email_user;
        });    
        
        if(userEmail !== undefined){
            console.log(userEmail)
            throw new Error("Email exists")
        }
        
        if(!this.id){
            this.id = uuid()
        }
        
        const passwordHash = await hash(password, 8)

        const docRef = await addDoc(collection(Connect, "users"), {
            id_user: this.id,
            name_user: name,
            email_user: email,
            password: password = passwordHash
        });

        const token = sign(
            {
                email: email
            },
            "d52ad414321b29c436c538ecf1766225",
            {
                subject: this.id,
                expiresIn: "1d"
            }
        )

        return (token);
    }
}

export { CreateUserService };