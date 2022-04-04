import { Link } from "react-router-dom";
import { useContext, useEffect, useState} from "react";
import styled from "styled-components";
import Progressbar from "./libs/progressBar/ProgressBar";
import TokenContext from "./context/Token";
import api from "./api";

function Footer ({color, refresh}){
    const {token, percentage, setPercentage} = useContext(TokenContext);
    const [infoDones, setDones] = useState({total:0, done:0});
    setPercentage(Math.ceil((infoDones.done/infoDones.total) * 100) || 0);


    useEffect(()=>{

        const config = {headers: {Authorization: `Bearer ${token}`}};
        
        api.get('/habits/today', config)
            .then(response => {
                const tam = response.data.filter((item, index) => response.data[index].done === true); // filters only completed habits
                setDones({total: response.data.length, done: tam.length});  
                
               
            })
            .catch(err =>  console.log('Eu sou o erro', err));        
    },[refresh]);
    

    
    
    return(
        <ContainerFooter>
            
            <Link to={'/habitos'} >
                <h1>Hábitos</h1>
            </Link>

            <Link to={'/hoje'}>
                <Progressbar percentage={percentage} color={color}/>
            </Link>

            <Link to={'/historico'}>
                <h1>Histórico</h1>
            </Link>

        </ContainerFooter>   
    );
}

const ContainerFooter = styled.footer`

    position:fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom:0;
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;
    color: #52B6FF;

    a {
        color: #52B6FF;
    }
    a:hover {
        color: lightblue;
    }

    h1{
        margin: 0px 10px 0px 10px;
    }

`

export default Footer;