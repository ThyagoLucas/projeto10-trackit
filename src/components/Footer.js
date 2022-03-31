import styled from "styled-components";

function Footer (){

    return(

        <ContainerFooter>
            <h1>Eu sou o Footer</h1>
        </ContainerFooter>
        
    )


}

const ContainerFooter = styled.footer`

    position:fixed;
    bottom:0;
    width: 100%;
    background-color: purple;
    


`

export default Footer;