import axios from "axios";
import "../styles/CreateAccount.css"
import ManReading from "/images/manReading.svg"
import { useForm } from "react-hook-form";
import Form from "../components/Form/Form";


export function CreateAccount(){
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) =>{
        const user = {
            name: data.name,
            email: data.email,
            password: data.password,
        }

        axios({
            method: "post",
            url: "http://localhost:3000/createuser",
            data: user
        }).then(function (response) {
            console.log(response);
            localStorage.setItem('token', response.data)
            if(localStorage.token){
                window.location.replace("/")
            }
          })
          .catch(function (error) {
            if(error.response.data){
                var messageError = document.getElementById('MessageError')
                messageError!.style.display = "block";

                document.querySelector('#MessageError')!.innerHTML = "Esse email já existe!"
            }
          });
    }

    return (
        <div id="ContainerUser">
            <div id="ContentUser">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <p className="TitleForm">Cadastro de usuários</p>

                    <p id="MessageError" style={{
                        color: "red",
                        textAlign: "center",
                        marginBottom: "2%"
                    }}></p>

                    <label>Nome</label>
                    <input type="text" {...register("name")} required/>

                    <label>E-mail</label>
                    <input type="email" {...register("email")} required/>
                    
                    <label>Senha</label>
                    <input type="password" {...register("password")} required/>


                    <input type="submit" id="ButtonSend" value="Cadastrar"/>
                </Form>
            </div>

            <div id="IllustrationArea">
                <img src={ManReading} className="PersonIllustration" alt="Ilustração de pessoas lendo livro"/>
                <a href="/login">Já tenho conta</a>
            </div>
        </div>
    );
}