import { Link } from "react-router-dom";
import styled from "styled-components";


import Logo from '../src/assets/img/trackit-logo.png'

function Login(){

    return(
        <>
            <main>
                <img src={Logo} alt={'Logo do track-it'}></img>
                <Form>
                    <input placeholder="Email" type={"email"}></input>
                    <input placeholder="Senha" type={"password"}></input>
                    <button type={"submit"}> Entrar</button>

                    <Link to={'/cadastro'}>
                        <h1>Não tem uma conta? <strong> cadastre-se</strong></h1>
                    </Link>
                    
                </Form>

            </main>
        
        </>


    )


}

const Form = styled.form`

    display:flex;
    flex-wrap:wrap;
    flex-direction: column;
    
    width:100%;
    
    justify-content:center;
    align-items:center;

    button{
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        color:#FFFFFF;
    }
    input{
        width: 100%;
        margin-bottom: 10px;
        width: 303px;
        height: 45px;
        border-radius: 5px;
        color:#DBDBDB;
        padding-left: 5px;
        border:1px solid #D4D4D4;

    }
    h1{
        backgroun-color: pink;
        color:#52B6FF;
        margin-top: 15px;
    }

`


export default Login;