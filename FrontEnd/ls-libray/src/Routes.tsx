import { CreateAccount } from "./pages/CreateAccount";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { AppHome } from "./pages/Home";
import { LoginAccount } from "./pages/LoginAccount";
import { InfoBook } from "./pages/InfoBook";
import { AddBook } from "./pages/AddBooks";
import { MyBooks } from "./pages/MyBooks";
import { EditBook } from "./pages/EditBook";

export function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AppHome />} />
                <Route path="/home" element={<AppHome />} />
                <Route path="/createaccount" element={<CreateAccount />} />
                <Route path="/login" element={<LoginAccount />} />
                <Route path="/book/:id" element={<InfoBook />} />
                <Route path="/addbook" element={<AddBook />} />
                <Route path="/mybooks" element={<MyBooks />} />
                <Route path="/editbook/:id" element={<EditBook />} />
            </Routes>
        </Router>
    )
}