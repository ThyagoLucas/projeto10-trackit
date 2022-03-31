import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";


import Cadastro from "./Cadastro";
import Login from "./Login";
import TokenContext from "./context/Token";
import Home from "./Home";

function App (){

    const [token, setToken] = useState(localStorage.getItem('token'));   

    localStorage.removeItem('token');
    

    return(

        <TokenContext.Provider value={{token, setToken}}>
            <BrowserRouter>
                <Routes >
                    <Route path="/" element={<Login/>} ></Route>
                    <Route path="/cadastro" element={<Cadastro/>}></Route>
                    <Route path="/hoje" element={<Home />}></Route>
                </Routes>   
            </BrowserRouter>
        </TokenContext.Provider>
        
    );
}

export default App;