import Login from "../Login"
import SignUp from "../SignUp";
import Home from "../Home";
import NewTransaction from "../NewTransaction";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TokenContext from "../../contexts/TokenContext";
import { useState } from "react";

function App() {
    const [token, setToken] = useState(localStorage.getItem('myWallet-token'))
    return (

        <TokenContext.Provider value={{ token, setToken }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/new/:type" element={<NewTransaction />} />
                </Routes>
            </BrowserRouter>
        </TokenContext.Provider>

    )
}

export default App