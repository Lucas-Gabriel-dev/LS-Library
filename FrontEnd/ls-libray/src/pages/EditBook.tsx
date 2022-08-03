import "../styles/AddBooks.css"
import axios from "axios";
import { useForm } from "react-hook-form";
import Form from "../components/Form/Form";
import { useEffect, useState } from "react";

type HomeProps = {
    bookTitle: string;
    bookAuthor: string;
    bookDate: string;
    bookCover: string;
    bookDescription: string;
}

function DeleteBook(){
    const params =  window.location.pathname.split("editbook/")

    axios({
        method: "DELETE",
        url: `http://localhost:3000/deletebook/${params[1]}`,
        headers: {Authorization: `Bearer ${localStorage.token}`},
    }).then(function (response) {
        console.log(response);

        if(response){
            window.location.replace(`/mybooks`)
        }
      })
      .catch(function (error) {
        if(error.response.data){
            var messageError = document.getElementById('MessageError')
            messageError!.style.display = "block";

            document.querySelector('#MessageError')!.innerHTML = "Não foi possível excluir o livro!"
        }
      });
}


export function EditBook(){
    const { register, handleSubmit } = useForm();
    const [ books, setBooks ] = useState<HomeProps[]>([]);

    const params =  window.location.pathname.split("editbook/")
    console.log(params[1])

    const onSubmit = (data: any) =>{
        const user = {
            id_book: params[1],
            bookTitle: data.title,
            bookAuthor: data.author,
            pubDate: data.date,
            bookCover: data.cover,
            bookDescription: data.description,
        }

        axios({
            method: "PATCH",
            url: "http://localhost:3000/editbook",
            headers: {Authorization: `Bearer ${localStorage.token}`},
            data: user
        }).then(function (response) {
            console.log(response);

            if(response.data){
                window.location.replace(`/book/${params[1]}`)
            }
          })
          .catch(function (error) {
            console.log(user)
            if(error.response.data){
                var messageError = document.getElementById('MessageError')
                messageError!.style.display = "block";

                document.querySelector('#MessageError')!.innerHTML = "Não foi possível editar o livro!"
            }
          });
    }

    useEffect(() => {
        fetch(`http://localhost:3000/detailbook/${params[1]}`)
        .then(response => response.json())
        .then(data => {
            setBooks(data);
        })
    }, [])

    const buttonDelete = document.getElementById("ButtonDelete")
    const buttonCancel = document.getElementById("ButtonSendAlert")
    const divAlert = document.getElementById("AlertMessage")

    buttonDelete?.addEventListener('click', () => {
        divAlert!.style.display = "block"
    })

    buttonCancel?.addEventListener('click', () => {
        divAlert!.style.display = "none"
    })



    return(
        <div id="ContainerAddBook">
            <p id="MessageError" 
                style={{
                    color: "red",
                    textAlign: "center"
                }}
            >
            </p>

            <div id="AlertMessage" 
            >
                <p>
                    Tem certeza que deseja excluir esse livro?
                </p>

                <button id="ButtonSendAlert" 
                style={{
                    marginRight: "5%" 
                }}>
                    Cancelar
                </button>

                <button id="ButtonDeleteAlert" onClick={DeleteBook}>
                    Excluir
                </button>
            </div>
            {books.map(repo => {
                return(
                    <Form onSubmit={handleSubmit(onSubmit)}> 
                        <div style={{
                                display: "flex",
                                justifyContent:' space-between',
                                margin:'auto'
                        }}>
                        <section 
                            style={
                                {
                                width: "30%",
                                margin: "auto"
                            }}
                        >
                            <p className="TitleForm"
                                style={{
                                    fontSize: "clamp(1px, 1.9rem, 2vw)",
                                    marginBottom: "2%",
                                    textAlign: "center"
                                }}
                            >
                                Cadastro de usuários</p>

                            <label>Título</label>
                            <input type="text" id="AddTitleBook"  defaultValue={repo.bookTitle} {...register("title")}/>
                            <label>Autor</label>
                            <input type="text" id="AddAuthorBook" defaultValue={repo.bookAuthor} {...register("author")} required/>
                            <label>Data de publicação</label>
                            <input type="date" id="AddDataBook" defaultValue={repo.bookDate} {...register("date")} required/>
                            <label>Capa do livro (url)</label>
                            <input type="text" id="AddBookCover" defaultValue={repo.bookCover} {...register("cover")} required/>
                        </section>
                        
                        <section
                            style={{
                                marginLeft: "5%",
                                width: "50%"
                            }}
                        >
                            <label>Descrição</label>
                            <textarea id="BookSynopsis" defaultValue={repo.bookDescription} {...register("description")} required/>

                            <section 
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >
                                <input type="submit" id="ButtonSend" value="Editar"
                                    style={{
                                        width: "45%"
                                    }}
                                />
                                <button id="ButtonDelete" type="button"
                                    style={{
                                        textAlign: "center",
                                        width: "45%"
                                    }}
                                >Excluir</button>
                            </section>
                        </section>
                        </div>
                        
                    </Form>
                )
            })}
        </div>
    )
}