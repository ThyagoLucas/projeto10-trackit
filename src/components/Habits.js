import Footer from "./Footer";
import Header from "./Header";
import { MdAddBox } from 'react-icons/md'; 
import styled from "styled-components";
import { useState, useContext } from "react";
import api from "./api";

import TokenContext from "./context/Token";

function Habits (){

    return(
    <>
        <Header />

        <main>

            <Container>
                <Top />

            
                

            </Container>
     
        </main>

        <Footer />
    </>
    )
}

function Top(){

    const [status, setStatusForms] = useState(false);
  
    return(
        <>
            <div>
                <h1>Meus hábitos</h1>

                <button onClick={()=> setStatusForms(true)}>
                    <MdAddBox color="#52B6FF" size="50px"/>
                </button>            
            </div>

            <FormState state = {status} setStatus={setStatusForms}/>
            
        </>
    )
}

function FormState ({state, setStatus}){

    const {token} = useContext(TokenContext);
    
    const [habit, setDataHabit] = useState({name:'', days:[]});

    console.log(habit);

    function assembleHabit(number){
        
        const thereIs = habit.days.indexOf(number);
        
        if(thereIs === -1){
            habit.days.push(number);
            setDataHabit({...habit, days:[...habit.days]});
        }else{
            habit.days.splice(thereIs,1);
            setDataHabit({...habit, days:[...habit.days]});
        }

    }

    function sendHabit(event){

        event.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        api
            .post('/habits', habit, config)
            .then(response => {
                setStatus(false);

            })
            .catch(err => console.log('OOO Erro', err));
    }


    return state === true ?

        <Form onSubmit={sendHabit}>
            <input required placeholder="nome do hábito" onChange={(e)=> setDataHabit({...habit, name: e.target.value})}></input>
            <Days sendHabit={assembleHabit} />

            <Buttons setStatusForms={setStatus} sendHabit={sendHabit}/>
            
        </Form> : <></>
    
}

function Days({sendHabit}){
    
    const weekday = ['D','S','T','Q','Q','S','S'];
    const numberDays = [0, 1, 2, 3, 4, 5, 6];
    
    return(

        <div className="weekday">
            {weekday.map((letter,index) => <Day key={index} letter={letter} sendHabit={sendHabit} numberDay={numberDays[index]}/> )}
        </div>
        
    );
}

function Day ({letter, sendHabit, numberDay}){

    const [selected, setSelected] = useState(false);

    const buttonColor = `days ${selected === true ? 'on':'off'}`;

    function toggle(number){
        selected ? setSelected(false):setSelected(true);
        sendHabit(number);
    }

    return(
        <h2 onClick={()=>toggle(numberDay)} className={buttonColor} >{letter}</h2> 
    );
}

function Buttons ({setStatusForms, sendHabit}){

    return(

        <div className="buttons">
            <button onClick={()=> setStatusForms(false)}>Cancelar</button>
            <button>Salvar</button>
        </div>


    )



}
const Container = styled.div`

    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 80px;
    width: 100%;
    
    h1{
        padding:10px;
        color: #52B6FF;
    }
    div:first-child{
        font-weight: 400;
        font-size: 22px;
        line-height: 29px;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        width: 100%;
        background-color: aquamarine;
    }
    button{
        background-color: none;
    }

    form{
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: blanchedalmond;
    }
    form input{
        padding: 10px;
        width: 75%;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        
    }
    input::placeholder{
        font-size: 15px;        
    }
    
    .weekday{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        background-color: aliceblue;
        width: 75%;
        padding: 10px;
        
    }
    .days{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    }
    .on{
        background-color: #CFCFCF;
        border-color: lightgreen;
        color: green;
        
    }
    .off{
        color: #DBDBDB;
    }
    .buttons{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 75%;
        height: 50px;
        background-color: dimgrey;
    }
    .buttons :first-child {
        color:#52B6FF;
    }
    

`
const Form = styled.form`
    background-color: aliceblue;
`

export default Habits;