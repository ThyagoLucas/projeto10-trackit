import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

import { useState, useEffect, useContext } from "react";
import api from "./api";
import {AiFillCheckSquare} from 'react-icons/ai';

import TokenContext from "./context/Token";
import { useNavigate } from "react-router-dom";

function Today (){

    const navigate = useNavigate(); 
    const {token, setPercentage, percentage} = useContext(TokenContext);   //tokens that the components uses
    const [infoDones, setDones] = useState({total:0, done:0});            // infos to calculate the percentage
    const [habitsToday, setHabitsToday] = useState([]);                  //  set the habits coming from API
    const [refresh, setRefresh] = useState({});                         //   to refresh the useEffect when updated some child, how: add habit for exemple
    setPercentage(Math.ceil((infoDones.done/infoDones.total) * 100) || 0); // set the percentage arounded up 

    useEffect(()=>{

        token === null ? navigate('/'):<></>;

        const config = {headers: {Authorization: `Bearer ${token}`}};
        
        api.get('/habits/today', config)
            .then(response => {
                const tam = response.data.filter((item, index) => response.data[index].done === true); // filters only completed habits
                setDones({total: response.data.length, done: tam.length});  
                setHabitsToday(response.data);
               
            })
            .catch(err =>  console.log('Eu sou o erro', err));        
    },[refresh]);

    return(

        <>
            <Header/>
            <main>
                <Container>
                    <TopToday />
                    {habitsToday.map((habit, index)=> <TodayHabit 
                                                                    key={index}
                                                                    habit={habit}
                                                                    setRefresh={setRefresh} />)}

                </Container>
            </main>
            <Footer color={'#fff'} refresh={refresh}/>
        </>
        
    )
}

function TopToday(){
    const {percentage} = useContext(TokenContext);

    const daysWeek = new Map([[0,'Domingo'], [1, 'Segunda'],[2, 'Ter??a'], [3, 'Quarta'], [4, 'Quinta'], [5, 'Sexta'], [6, 'S??bado']]);
    const dayjs = require('dayjs');
    const day = dayjs().format('DD/MM');
    const weekday = daysWeek.get(dayjs().day());


    return(
        <>
        <div className="top">
            <h2>{weekday}, {day}</h2>
            {percentage == 0 
            ? <h1 className="gray" >Nenhum h??bito conclu??do ainda</h1>
            : <h1 className="green">{percentage}% dos h??bitos conclu??dos</h1>}
              
        </div>
        </>
    )
}

function TodayHabit({habit, setRefresh}){

    const{token} =useContext(TokenContext);
    const {id, name, done, currentSequence, highestSequence} = habit;

    const [check, setCheck] = useState(done);
    
    const statusCheck = `check ${check ? 'green': 'gray'}`;
    const colorSequence = `${currentSequence === highestSequence && highestSequence>0 ? 'green': 'grey'}`

    function checkAndUnCheck(id){

        check ? setCheck(false):setCheck(true);

        const config = {headers: {Authorization: `Bearer ${token}`}};

        !check ? 
        api
            .post(`/habits/${id}/check`, undefined, config)
            .then(response => setRefresh(response))
            .catch(err => console.log('Esse foi o erro ao marcar o hab como feito', err))

        :api
            .post(`/habits/${id}/uncheck`, undefined, config)
            .then(response => setRefresh(response))
            .catch(err => console.log('Esse foi o erro ao marcar o hab como feito', err))
    }

    return (

        <div className="habitsToday">
            <div>
                <h1>{name}</h1>
                <h3 className={colorSequence}>Sequencia atual: {currentSequence} dias</h3>
                <h3 className={colorSequence}>Seu recorde: {highestSequence} dias</h3>

            </div>
            <h1 className={statusCheck} onClick={()=> checkAndUnCheck(id)}>
                <AiFillCheckSquare size={'60px'} color={`${check? '#8FC549':'#BABABA'}`}/>
            </h1>
            
        </div>
    )
}

const Container = styled.div`

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;

    .top{
        width: 100%;
        color: #126BA5;
        z-index: 0;
    }
    .top h2{
        font-size: 23px;
        margin-bottom: 5px;
    }
    .top h1{
        font-size: 18x;
        line-height: 22px;
        margin-bottom: 15px;
    }

    .green{
        color:#8FC549;
    }
    .gray{
        color:#BABABA;
    }

    .habitsToday{
        width: 100%;
        height: 94px;
        background-color:#FFFFFF;
        margin: 5px;
        display: flex;
        padding: 0px 10px 0px 10px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .check{
        width: 60px;
        height: 60px;
        
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export default Today;