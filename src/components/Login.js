import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

import { useContext } from "react";
import TokenContext from "../context/Token";
import Logo from '../assets/img/trackit-logo.png'
import api from "./api";

function Login(){

    const [loginDatas, setDatasLogin] = useState({email:'', password:''});
    const {token, setToken} = useContext(TokenContext);
    const navigate = useNavigate();

    token != null ? navigate('/hoje'):<></>;

    function login(event){
        
        event.preventDefault();

        api
            .post('/auth/login', loginDatas)
            .then(response => {
                setToken(response.data.token);
                navigate('/hoje'); 
                localStorage.setItem('token', response.data.token);               
            })
            .catch(err => {
                alert("Usuario ou senha errados"); 
            });

    }

    return(
        <>
            <main>
                <img src={Logo} alt={'Logo do track-it'}></img>
                <Form onSubmit={login}>
                    <input required placeholder="Email" type={"email"} onChange={(e)=> setDatasLogin({...loginDatas, email: e.target.value})}></input>
                    <input required placeholder="Senha" type={"password"} onChange={(e)=> setDatasLogin({...loginDatas, password: e.target.value})}></input>

                    <button type={"submit"}>Entrar</button>

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