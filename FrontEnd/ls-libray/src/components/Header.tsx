import Logo from "../../public/images/book.svg"
import "../App.css"


export function Header(){
    let valueButton1: string
    let valueHREF1: string
    let valueHREF2: string
    let valueButton2: string
    let buttonStatus: string
    
    if(localStorage.token){
        valueButton1 = "Meus Livros"
        valueHREF1 = "/mybooks"

        valueButton2 = "Adicionar Livro"
        valueHREF2 = "/addbook"

        buttonStatus = "inline"
    }
    else{
        valueButton1 = "Login"
        valueHREF1 = "/login"

        valueButton2 = "Registre-se"
        valueHREF2 = "/createaccount"

        buttonStatus = "none"
    }
   

    return(
        <header>
            <div className="Header">
                <img className="LogoImg" src={Logo} alt="Imagem de um livro aberto"/>
                <p className="LogoTitle"> LS Library</p>
            </div>
            
            <section className="Buttons">
                <div className="DivNavBar">
                    <a className="Button" href="/Home">
                        Home
                    </a>

                    <a className="Button" id="ButtonLoginHom" href={valueHREF1}>
                        {valueButton1} 
                    </a>

                    <a className="Button Detach" id="ButtonRegisterHom" href={valueHREF2}>
                        {valueButton2}
                    </a>

                    <button id="Logout" onClick={Logout}
                        style={{
                            display: `${buttonStatus}`
                        }}
                    >
                        Sair
                    </button>
                </div>
            </section>
        </header>
    )
}

function Logout(){
    localStorage.token = '';

    window.location.replace("/")
}