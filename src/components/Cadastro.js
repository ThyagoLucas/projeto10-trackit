import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Logo from '../assets/img/trackit-logo.png'
import api from './api';

import styled from 'styled-components';

function Cadastro (){
    const navigate = useNavigate();
    const [datasUser, setDatas] = useState({email:'', name:'',image:'', password:''});

    function sendRegister(event){

        event.preventDefault();

        api
            .post('/auth/sign-up', datasUser)
            .then(response => {
                alert("cadastrado com sucesso!!");
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return(
        <>
        <main>
            <img src={Logo} alt={'Logo do track-it'}></img>
            <Form onSubmit={sendRegister}> 

                <input required placeholder="Email" type={"email"} value={datasUser.email} onChange={(e) => setDatas({...datasUser, email: e.target.value}) }></input>
                <input required placeholder="Senha" type={"password"} value={datasUser.password} onChange={(e) => setDatas({...datasUser, password: e.target.value}) }></input>
                <input required placeholder="Nome" type={"text"} value={datasUser.name} onChange={(e) => setDatas({...datasUser, name: e.target.value}) }></input>
                <input required placeholder="Foto" type={"url"} value={datasUser.image} onChange={(e) => setDatas({...datasUser, image: e.target.value}) }></input>

                <button type={"submit"} >Cadastrar</button>
                
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

export default Cadastro;