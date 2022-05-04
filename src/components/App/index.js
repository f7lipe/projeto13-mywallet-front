import Login from "../Login"
import SignUp from "../SignUp";
import Home from "../Home";
import NewTransaction from "../NewTransaction";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/new/:type" element={<NewTransaction/>} />
        </Routes>
    </BrowserRouter>
    )
}

export default App