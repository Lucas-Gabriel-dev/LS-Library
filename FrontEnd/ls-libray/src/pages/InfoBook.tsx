import { useEffect, useState } from "react";
import "../styles/InfoBook.css"

type HomeProps = {
    bookTitle: string;
    bookAuthor: string;
    bookDate: string;
    bookDescription: string;
    bookCover: string;
}

export function InfoBook(){
    const [ books, setBooks ] = useState<HomeProps[]>([]);

    const params = window.location.pathname.split("book/")

    useEffect(() => {
        fetch(`http://localhost:3000/detailbook/${params[1]}`)
        .then(response => response.json())
        .then(data => {
            setBooks(data);
        })
    }, [])

    return(
        <div>
            {books.map(repo => {
                return(
                    <div id="PrincipalInformation">
                        <section id="InfoSection">
                            <p id="TitleSection">Título</p>
                            <p id="TitleName">{repo.bookTitle}</p>
                        </section>
                        <section id="InfoSection">
                            <p id="TitleSection">Autor</p>
                            <p id="AuthorName">{repo.bookAuthor}</p>
                        </section>
                        <section id="InfoSection">
                            <p id="TitleSection">Data de publicação</p>
                            <p id="DataInfo">{repo.bookDate}</p>
                        </section>
                    </div>
                )
            })}

            {books.map(repo => {
                return(
                    <div id="InfoBook">
                        <div id="Synopsis">
                            <p id="Title">Sinopse</p>
                            <p id="TextSynopsis">
                                {repo.bookDescription}
                            </p>
                        </div>

                        <div id="BookCover">
                            <img src={repo.bookCover} alt="Capa do Livro" />

                            
                        </div>
                    </div>
                )
            })}

                
            
        </div>
    )
}