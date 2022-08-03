import "../styles/AddBooks.css"
import axios from "axios";
import { useForm } from "react-hook-form";
import Form from "../components/Form/Form";

type HomeProps = {
    bookTitle: string;
    bookAuthor: string;
    bookDate: string;
    bookCover: string;
    bookDescription: string;
}


export function AddBook(){
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) =>{
        const user = {
            bookTitle: data.title,
            bookAuthor: data.author,
            pubDate: data.date,
            bookCover: data.cover,
            bookDescription: data.description,
        }

        axios({
            method: "post",
            url: "http://localhost:3000/addbook",
            headers: {Authorization: `Bearer ${localStorage.token}`},
            data: user
        }).then(function (response) {
            console.log(response);

            if(response.data){
                window.location.replace("/mybooks")
            }
          })
          .catch(function (error) {
            console.log(user)
            if(error.response.data){
                var messageError = document.getElementById('MessageError')
                messageError!.style.display = "block";

                document.querySelector('#MessageError')!.innerHTML = "Não foi possível adicionar o livro!"
            }
          });
    }

    return(
        <div id="ContainerAddBook">
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
                    <input type="text" id="AddTitleBook" {...register("title")} required/>
                    <label>Autor</label>
                    <input type="text" id="AddAuthorBook" {...register("author")} required/>
                    <label>Data de publicação</label>
                    <input type="date" id="AddDataBook" {...register("date")} required/>
                    <label>Capa do livro (url)</label>
                    <input type="text" id="AddBookCover" {...register("cover")} required/>
                </section>
                
                <section
                    style={{
                        marginLeft: "5%"
                    }}
                >
                    <label>Descrição</label>
                    <textarea id="BookSynopsis" {...register("description")} required/>

                    <input type="submit" id="ButtonSend" />
                </section>
                </div>
                
            </Form>
        </div>
    )
}