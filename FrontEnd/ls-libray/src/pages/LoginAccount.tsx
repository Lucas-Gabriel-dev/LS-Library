import PersonIllustration1 from "/images/personIllustration1.svg"
import { useForm } from "react-hook-form";
import Form from "../components/Form/Form";
import axios from "axios";


export function LoginAccount(){
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) =>{
        const user = {
            email: data.email,
            password: data.password
        }

        axios({
            method: "post",
            url: "http://localhost:3000/login",
            data: user
        }).then(function (response) {
            console.log(response);

            if(response.data){
                localStorage.setItem('token', response.data)
                
                window.location.replace("/")
            }
          })
          .catch(function (error) {
            if(error.response.data){
                var messageError = document.getElementById('MessageError')
                messageError!.style.display = "block";

                document.querySelector('#MessageError')!.innerHTML = "Email ou senha incorreto"
            }
          });
    }

    return (
        <div id="ContainerUser">
            <div id="ContentUser">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <p className="TitleForm">Entre na sua conta</p>
                    <p id="MessageError" style={{
                        color: "red",
                        textAlign: "center",
                        marginBottom: "2%"
                    }}></p>

                    <label>E-mail</label>
                    <input type="email" id="EmailUser" {...register("email")} required
                        style={{
                            marginBottom: '10%',
                        }}
                    />

                    <label>Senha</label>
                    <input type="password" id="PasswordUser" {...register("password")} required 
                        style={{
                            marginBottom: '10%',
                        }}
                    />

                    <input type="submit" id="ButtonSend" value="Entrar"
                        style={{
                            marginTop: '5%',
                        }}
                    />
                </Form>
            </div>

            <div id="IllustrationArea">
                <img src={PersonIllustration1} className="PersonIllustration" alt="Ilustração de um homem lendo livro"
                    style={{
                        padding: "5%",
                    }}
                />
                <a href="/createaccount">Registre-se</a>
            </div>
        </div>
    )
}