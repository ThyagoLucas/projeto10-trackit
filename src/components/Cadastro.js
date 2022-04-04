import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import Spinner from './libs/spinner/Spinner';

import Logo from '../assets/img/trackit-logo.png'
import api from './api';
import TokenContext from "./context/Token";

import styled from 'styled-components';

function Cadastro (){

    const {token} = useContext(TokenContext);
    const navigate = useNavigate();
    token !== null ? navigate('/'):<></>;
    const [datasUser, setDatas] = useState({email:'', name:'',image:'', password:''});
    const [inputsLockeds, setInputs] = useState({activate: false, button:'Cadastrar'});

    function sendRegister(event){

        event.preventDefault();

        setInputs({...inputsLockeds, activate: true, button:<Spinner/>});
    
        api
            .post('/auth/sign-up', datasUser)
            .then(response => {
                alert("cadastrado com sucesso!!");
                navigate('/')}
                )
            .catch(err => {
                setInputs({...inputsLockeds, activate: false, button:'Cadastrar'});
                alert("Tivemos um problema, tente novamente em alguns minutos")}
                );
    }

    return(
        <>
        <main>
            <img src={Logo} alt={'Logo do track-it'}></img>
            <Form onSubmit={sendRegister}> 

                <input required disabled={inputsLockeds.activate} placeholder="  Email: " type={"email"} value={datasUser.email} onChange={(e) => setDatas({...datasUser, email: e.target.value}) }></input>
                <input required disabled={inputsLockeds.activate} placeholder="  Senha" type={"password"} value={datasUser.password} onChange={(e) => setDatas({...datasUser, password: e.target.value}) }></input>
                <input required disabled={inputsLockeds.activate} placeholder="  Nome" type={"text"} value={datasUser.name} onChange={(e) => setDatas({...datasUser, name: e.target.value}) }></input>
                <input required disabled={inputsLockeds.activate} placeholder="  URL Foto" type={"url"} value={datasUser.image} onChange={(e) => setDatas({...datasUser, image: e.target.value}) }></input>

                <button type={"submit"} disabled={inputsLockeds.activate}>{inputsLockeds.button}</button>
                
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
        padding-left: 5px;
        border:1px solid #D4D4D4;

    }
    input::placeholder{
        font-weight: bold;
        font-style: italic;
    }
    h1{
        backgroun-color: pink;
        color:#52B6FF;
        margin-top: 15px;
    }

`

export default Cadastro;