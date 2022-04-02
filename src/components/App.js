import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useState} from "react";

import Cadastro from "./Cadastro";
import Login from "./Login";
import TokenContext from "./context/Token";
import Habits from "./Habits";
import Today from "./Today";
import Historic from "./Historic";
import { useEffect } from "react/cjs/react.production.min";

function App (){

    const [token, setToken] = useState(localStorage.getItem('token'));
    //localStorage.removeItem('token');
    
    return(

        <TokenContext.Provider value={{token, setToken}}>
            <BrowserRouter>
                <Routes >
                    <Route path="/" element={<Login />} ></Route>
                    <Route path="/cadastro" element={<Cadastro />}></Route>
                    <Route path="/habitos" element={<Habits />} ></Route>
                    <Route path="/hoje" element={<Today />}></Route>
                    <Route path="/historico" element={<Historic />}></Route>
                </Routes>   
            </BrowserRouter>
        </TokenContext.Provider>
        
    );
}

export default App;