import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./Cadastro";
import Login from "./Login";

function App (){

    return(

        <BrowserRouter>
            <Routes >
            
                    <Route path="/" element={<Login/>} ></Route>
                    <Route path="/cadastro" element={<Cadastro/>}></Route>

            </Routes>   
        </BrowserRouter>

    );
}

export default App;