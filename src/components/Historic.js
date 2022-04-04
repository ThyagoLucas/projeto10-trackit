import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

function Historic(){

    return(

    <>
        <Header/>
        <main>
            <Container>
                <h2>Histórico</h2>
                <h1>Em breve você poderá ver o histórico dos seus hábitos aqui!</h1>
            </Container>
        </main>
            
            
        
        <Footer/>
    </>
        

            
    );


}

const Container = styled.div`

    width:100%;

    h2{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;



color: #126BA5;

    }
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;

        color: #666666;
        }



`


export default Historic;