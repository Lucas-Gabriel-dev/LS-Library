import "../styles/Home.css"
import BookCover from "../../public/images/bookCover.png"
import { useEffect, useState } from "react";

type HomeProps = {
    book_title: string;
    book_author: string;
    book_cover: string;
    id_book: string;
}

export function AppHome(){
    const [ books, setBooks ] = useState<HomeProps[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/consultbook', {})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setBooks(data);
        })
    }, [])

    console.log("Licas")

    return(
        <div id="Container">
            <p id="TitleHome">Livros Adicionados Recentemente</p>

            <div id="Content">
                {books.map(repo => {
                    return(
                        <div id="AllBooksView">
                            <div id="CoverAndTitle">
                                <section
                                    style={{
                                        display: 'flex',
                                        flexDirection: "column",
                                        gap: '2%'
                                    }}
                                >
                                    <p id="TitleBook"><b>{repo.book_title}</b> </p>
                                    <p id="AuthorBook"> <b>Autor:</b>  {repo.book_author}</p>
                                </section>
                                

                                <img src={repo.book_cover} 
                                    id="BookCover" className="ClassBookCover" 
                                    alt="Capa do Livro"
                                    style={{
                                        width: "30%"
                                    }}
                                />
                            </div>
                                <a href={`/book/${repo.id_book}`} id="ButtonHomeRedirectBook"> Ver mais</a>
                           
                        </div>
                    )
                })}
            </div>
        </div>
    )
}