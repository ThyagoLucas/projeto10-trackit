import { Link, useNavigate } from "react-router-dom";
import { useState, useContext} from "react";
import styled from "styled-components";

import TokenContext from "./context/Token";
import Logo from '../assets/img/trackit-logo.png'
import api from "./api";
import Spinner from "./libs/spinner/Spinner";

function Login(){

    const navigate = useNavigate();
    
    const {token, setToken} = useContext(TokenContext);

    token != null ? navigate('/habitos'):<></>;

    const [loginDatas, setDatasLogin] = useState({email:'', password:''});
    const [inputsLockeds, setInputs] = useState({activate: false, buttom:'Entrar'});
  
    function tryLogin(event){

        event.preventDefault();
        setInputs({...inputsLockeds, activate: true, buttom:<Spinner/>});
       
        setTimeout(() => {
            console.log("Entrou!")
            api
            .post('/auth/login', loginDatas)
            .then(response => {
                setToken(response.data.token);
                navigate('/habitos'); 
                localStorage.setItem('token', response.data.token);   
                localStorage.setItem('userImage', response.data.image);               
            })
            .catch(err => {
                setInputs({...inputsLockeds, activate: false, buttom:'Entrar'});
                alert("Usuario ou senha errados"); 
            });
        }, 3000); 

    }

    return(
        <>
        <main>
            <img src={Logo} alt={'Logo do track-it'}></img>

            <Form onSubmit={tryLogin}>
                <input required disabled={inputsLockeds.activate} placeholder="Email" type={"email"} onChange={(e)=> setDatasLogin({...loginDatas, email: e.target.value})}></input>
                <input required disabled={inputsLockeds.activate} placeholder="Senha" type={"password"} onChange={(e)=> setDatasLogin({...loginDatas, password: e.target.value})}></input>

                <button type={"submit"} disabled={inputsLockeds.activate}>{inputsLockeds.buttom}</button>

                <Link to={'/cadastro'}>
                    <h1>Não tem uma conta? <strong> cadastre-se</strong></h1>
                </Link>
                
            </Form>
        </main>
        </>
    );
}

const Form = styled.form`

    display:flex;
    flex-wrap:wrap;
    flex-direction: column;
    width:100%;
    justify-content:center;
    align-items:center;

    button{
        display: flex;
        align-items: center;
        justify-content: center;
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
        color:#4F4F4F;
        border:1px solid #D4D4D4;

    }
    input::placeholder{
        font-weight: bold;
        font-style: italic;
    }
    h1{
        color:#52B6FF;
        margin: 15px 0px 25px 0px;  
    }

`

export default Login;