import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

async function connect() {
    const firebaseConfig = {
        apiKey: "AIzaSyDyJMg5j5jh6PD1aBtWouxWY5m8cW0vC7o",
        authDomain: "ls-library2.firebaseapp.com",
        projectId: "ls-library2",
        storageBucket: "ls-library2.appspot.com",
        messagingSenderId: "597981902764",
        appId: "1:597981902764:web:52a944c8a7b6a7d2bcec09",
        measurementId: "G-0EM0CDHJZC"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return db
}

export { connect }