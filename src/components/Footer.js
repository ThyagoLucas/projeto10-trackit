import { Link } from "react-router-dom";
import styled from "styled-components";
import Progressbar from "./libs/progressBar/ProgressBar";

function Footer ({percentage, color}){

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