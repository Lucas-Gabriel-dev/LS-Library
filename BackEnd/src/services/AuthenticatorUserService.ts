import { connect } from "../database/db";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { collection, query, where, getDocs } from "firebase/firestore";

interface IAuthenticateUserRequest{
    email: string;
    password: string;
}

class AuthenticatorUserService{
    async execute({ email, password }: IAuthenticateUserRequest){
        const Connect = await connect()

        if(!email){
            throw new Error("Email incorrect"); 
        }

        const user = query(
            collection(Connect, "users"), where("email_user", "==", email)
        );

        let userInfo;

        const querySnapshot = await getDocs(user);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            userInfo = doc.data();
        });    

        if(userInfo.email_user === undefined){
            throw new Error("Email or password incorrect"); 
        }

        const passwordMatchUser = await compare(password, userInfo.password)
       
        if(passwordMatchUser){
            const token = sign(
                {
                    email: userInfo.email_user
                },
                "d52ad414321b29c436c538ecf1766225",
                {
                    subject: userInfo.id_user,
                    expiresIn: "1d"
                }
            )

            return (token);
        } 
    
        throw new Error("Email or password incorrect")
    }
}

export { AuthenticatorUserService };