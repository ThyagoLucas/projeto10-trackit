import { useState } from "react";

function Days({assembleHabit, toPrint, status}){

    const [print, setPrint] = useState([])
   
    const numberDays = [0, 1, 2, 3, 4, 5, 6];
    
    
    
    return(

        <div className="weekday">
            {numberDays.map((number,index) => <Day 
                                                    key={index}
                                                    assembleHabit={assembleHabit} 
                                                    numberDay={numberDays[index]} 
                                                    status={status}
                                                    print={print[index]}/> )}
        </div>
        
    );
}

function Day ({ assembleHabit, numberDay, status, print }){

    

    const weekdays = new Map([[0,'D'],[1,'S'],[2,'T'],[3,'Q'],[4,'Q'],[5,'S'],[6,'S']]);

    const [selected, setSelected] = useState(print);

    const buttonColor = `days ${selected === true ? 'on':'off'}`;


    function toggle(number){

     if(status == true){
        selected ? setSelected(false):setSelected(true);
        assembleHabit(number);
     }
    }

    return(
        <h2 onClick={()=>toggle(numberDay)} className={buttonColor}>{weekdays.get(numberDay)}</h2> 
    );
}

export default Days;