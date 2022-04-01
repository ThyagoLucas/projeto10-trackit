import styled from "styled-components";

function Header (){
    const foto = localStorage.getItem('userImage');

    return(
        <ContainerHeader>
            <h1>Trackit</h1>
            <img src={`${foto}`} alt="Foto do usuario"/>
        </ContainerHeader>
                    
    );
}

const ContainerHeader = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #126BA5;
    
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    h1{
        margin-left: 10px;
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        color: #FFFFFF;
    }
    img{
        margin-right: 10px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`
export default Header;