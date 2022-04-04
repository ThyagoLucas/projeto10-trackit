import Footer from "./Footer";
import Header from "./Header";
import { MdAddBox } from 'react-icons/md'; 
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import api from "./api";
import {BsTrashFill} from 'react-icons/bs'

import TokenContext from "./context/Token";
import Spinner from "./libs/spinner/Spinner";
import { useNavigate } from "react-router-dom";

function Habits (){

    const navigate = useNavigate();

    const {token} = useContext(TokenContext);
    const [myHabits, setMyHabits] = useState([]);
    const [refresh, setRefresh] = useState([]);

    useEffect(()=>{

        token === null ? navigate('/'):<></>;
        myHabits.length === 0 ? 
        <h1>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h1>: <></>
        
        const config = {headers: {Authorization: `Bearer ${token}`}};
        api
            .get('/habits', config)
            .then(response => {
                setMyHabits(response.data)
               
            })
            .catch(err => alert('Erro'));
    },[refresh])

    return(
    <>
        <Header />
        <main>
            <Container>
                <Top setRefresh={setRefresh}/>
                <MyHabits myHabits={myHabits} setRefresh={setRefresh}/>
                
            </Container>
        </main>
        <Footer color={'#fff'}/>
    </>
    )
}

function Top({setRefresh}){
    const [status, setStatusForms] = useState(false);
    return(
        <>
            <div className="top">
                <h1>Meus hábitos</h1>

                <button onClick={()=> setStatusForms(true)}>
                    <MdAddBox color="#52B6FF" size="50px"/>
                </button>            
            </div>

            <FormState state = {status} setStatus={setStatusForms} setRefresh={setRefresh}/>
            
        </>
    )
}

function FormState ({state, setStatus, setRefresh}){

    const {token} = useContext(TokenContext);
    const [habit, setDataHabit] = useState({name:'', days:[]});
    const [inputsLockeds, setInputs] = useState({activate: false, buttom:'Salvar'});

    const status = `${state=== true ? '':'disabled'}`;

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

    function sendHabit(){
        setInputs({activate:true, buttom:<Spinner/>})
        const config = {headers: {Authorization: `Bearer ${token}`}};
        state ? 
        api
            .post('/habits', habit, config)
            .then(response => {
                setStatus(false);
                setRefresh(response);
                setDataHabit({name:'', days:[]});
                setInputs({activate:false, buttom:'Salvar'})
            })
            .catch(err => {
            console.log('Erro ao enviar hábito ', err)
            setInputs({activate:false, buttom:'Salvar'})

            })
            :<></>;
    }
    return(

        <Form className={status}>
            <input required disabled={inputsLockeds.activate} placeholder="nome do hábito" value={habit.name} onChange={(e)=> setDataHabit({...habit, name: e.target.value})}></input>
            
            <Days sendHabit={assembleHabit} clickable={!inputsLockeds.activate} days={habit.days}/>

            <div className="buttons">
                <button className="cancel" disabled={inputsLockeds.activate} onClick={()=> setStatus(false)}>Cancelar</button>
                <button className="save" disabled={inputsLockeds.activate} onClick={()=> sendHabit()}>{inputsLockeds.buttom}</button>
            </div>
            
        </Form> 
    )      
}

function Days({sendHabit, clickable, days}){
    const letterDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    return(
        <div className="weekday">
            {letterDays.map((letter,index) => <Day key={index} days={days} clickable={clickable} letter={letter} sendHabit={sendHabit} numberDay={index}/> )}
        </div> 
    );
}

function Day ({sendHabit, letter,numberDay, clickable, days }){
    
    const selected = days.includes(numberDay);
    const buttonColor = `days ${selected === true ? 'on':'off'}`;

    function toggle(number){
        clickable ? sendHabit(number):<></>        
    }

    return(
        <button className={buttonColor} onClick={()=>toggle(numberDay)}>{letter}</button>
    );
}

function MyHabits({myHabits, setRefresh}){
    
    return (
        <div className="habits">
            { myHabits.map((habit, index) => <Habit key={index} habit={habit}  setRefresh={setRefresh}/>)}
        </div>

    )
}
function Habit({habit, setRefresh}){
    const{id, name, days}= habit;
    const [stateDelete, setStateDelete] = useState(false);

    return(
        <div className="habit">
            
            <div>
                <h1 className="habitName">{name}</h1>
                <h1 className="trash" onClick={()=> setStateDelete(true)}> <BsTrashFill/></h1>
                <DeleteHabit id={id} name={name} state={stateDelete} setStateDelete={setStateDelete} setRefresh={setRefresh}/>
            </div>
            <Days clickable={false} days={days} sendHabit={()=>{}}/>
        </div>
    )
}

function DeleteHabit({id, name, state, setStateDelete, setRefresh}){
    const {token} = useContext(TokenContext);

    function deleteH(id){
        const config = {headers: {Authorization: `Bearer ${token}`}}
        api
            .delete(`/habits/${id}`, config)
            .then(response => {
                alert("Habito apagado");
                setStateDelete(false);
                setRefresh(response)})
            .catch(err => console.log("Esse foi o erro", err));        
    }

    return state
    ? <div className="delete">
        <h1>Deseja mesmo apagar o habito de {name}</h1>
        <div className="optionsDelete">
            <h1 className="confirmDelete" onClick={()=> deleteH(id)}>Apagar</h1>
            <h1 className="cancel" onClick={()=> setStateDelete(false)}>Cancelar</h1>
        </div>
    </div>
    :<></>

}

const Container = styled.div`
    
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;

    .disabled{
        display: none;
    }
    
    .top h1{
        padding:10px;
        color: #126BA5;
    }
    .top{
        z-index: 1;
        font-weight: 400;
        font-size: 22px;
        line-height: 29px;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }
    .top button{
        background-color:none  ;
    }
    
    .weekday{
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        width: 75%;
        margin-top: 10px;
        
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
        color: #AAAAAA;
    }
    .buttons{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 75%;
        height: 50px;
    }
    .cancel{
        font-size: 15.976px;
        color: #52B6FF;
        margin-right: 10px ;
        background-color: none;
    }
    .buttons .cancel{
        background-color: #FFFFFF;
        
    }
    .save{
        font-size: 15.976px;
        background-color: #52B6FF;
        color: #FFFFFF;
        padding: 8px 20px 8px 20px;
        border-radius: 5px;
    }
    .habits{
        position: relative;
        margin-top: 20px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap; 
    }
    .habit{
        width:  100%;
        height: 91px;
        background-color: #FFFFFF;
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 10px;
        color: #666666;
        border-radius: 5px;  
    }
    .habit .weekday{
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        width: 100%;
        margin-top: 10px;
        
    }
    .habit div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
    
    
    .delete{
        position: absolute;
        width: 100%;
        height: 91px;
        border-radius: 5px;
        background-color: #126BA5;
        color: #FFFFFF;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .confirmDelete{
        background-color: red;
        padding: 6px;
        color: #FFFFFF;
        margin-left: 10px  
    }
    .optionsDelete{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
`
const Form = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px; 
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;

    input{
        padding: 10px 0px 10px;
        width: 75%;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-top:20px   
    }
    button {
        color: black;
    }

    input::placeholder{
        font-size: 15px;
                   
    }  
`

export default Habits;