import "../styles/Home.css"
import { useEffect, useState } from "react";
import axios from "axios";

type HomeProps = {
    book_title: string;
    book_author: string;
    book_cover: string;
    id_book: string;
}

export function MyBooks(){
    const [ booksUser, setBooksUser ] = useState<HomeProps[]>([]);

    useEffect(() => {
        fetch(`http://localhost:3000/mybooks`, {
            headers: {Authorization: `Bearer ${localStorage.token}`},
        })
        .then(response => response.json())
        .then(data => {
            

            if(data.error){
                var OcultDiv = document.getElementById('Content')
                var MessageError = document.getElementById('AlertMessage')
                
                OcultDiv!.style.display = "none";
                MessageError!.style.display = "block";
                
                return
            }

            if(!data.error){
                setBooksUser(data);
            }

        }).catch(function (error) {
            if(error.response.status === 401){
                var messageError = document.getElementById('TitleHome')
                messageError!.style.display = "block";
                
                messageError!.innerHTML = "Você não esta logado!"
                messageError!.style.color = "red";
            }
        });    
    }, [])
    
    return(
        <div id="Container">
            <p id="TitleHome">Meus livros</p>

            <div id="AlertMessage"
                style={{
                    padding: "3%"
                }} 
            >
                <p id="TitleAlert"
                    style={{
                        textAlign: "center",
                    }}
                >
                    Sem livros cadastrados! 📖 🚫
                </p>

                <p
                    style={{
                        textAlign: "center",
                        padding: "5%"
                    }}
                >
                    Você não possui livros cadastrados, deseja adicionar algum agora?
                </p>


                <a id="ButtonDeleteAlert" href="/home"
                    style={{
                        padding: "5%"
                    }}
                >
                    Cancelar
                </a>
                
                <a id="ButtonSendAlert" href="/addbook"
                style={{
                    marginLeft: "5%",
                    padding: "5%"
                }}>
                    Adicionar
                </a>

                
            </div>

            <div id="Content">
                    {booksUser.map(repo => {
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
                                <a href={`/editbook/${repo.id_book}`} id="ButtonHomeRedirectBook"> Editar</a>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}