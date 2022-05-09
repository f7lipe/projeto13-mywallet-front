import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import { useState, useContext } from "react"
import {useNavigate } from "react-router-dom";
import TokenContext from "../../contexts/TokenContext";
import axios from "axios";

function Login(){
    const url = 'https://projeto13-mywallet-filipe.herokuapp.com/signin'
    const [signinData, setSigninData] = useState({email:'', password:''})
    const [loading, setLoading] = useState(false)
    const { setToken } = useContext(TokenContext)
    let redirectUser = useNavigate()

    function login(event){
        event.preventDefault()
        setLoading(true) 
        const promise = axios.post(url, 
            {
                email: signinData.email,
                password: signinData.password
            }
        )
        promise.then((response)=>{
            const token = response.data
            setToken(token)
            localStorage.setItem('myWallet-Token', token)
            setLoading(false)
            redirectUser("/home")
        })
        .catch(err =>{
            alert(err.response.data)
            setLoading(false)
        })
    }
    
    return(
        <Main>
            <Logo>MyWallet</Logo>
            <Form onSubmit={login}> 
                <Label>
                    <Input type="e-mail" name="e-mail" placeholder="E-mail" value={signinData.email} onChange={(e)=>setSigninData({...signinData, email: e.target.value})} required disabled={loading}/>
                </Label>
                <Label>

                    <Input type="password" name="password" placeholder="Senha" value={signinData.password} onChange={(e)=>setSigninData({...signinData, password: e.target.value})} required disabled={loading}/>
                </Label>

                <EnterButton type="submit" value="Entrar" disabled={loading}>
                        {loading ? <ThreeDots color="white" height={80} width={80}/> : "Entrar"}
                </EnterButton>
            </Form>
            <Link to={"/signup"}>
            <SignupButton>Não tem uma conta? Cadastre-se</SignupButton>
            </Link>
        </Main>
    )
}




const Logo = styled.div`
font-family: 'Saira Stencil One';
font-size: 32px;
font-weight: 400f;
color: white;
`
const Main = styled.main`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 25vh;
`

const Form = styled.form`
margin-top: 20%;
width: 80vw;
display: flex;
flex-direction: column;
`
const Label = styled.label`
margin-bottom: 10px;
`
const Input = styled.input`
width: 80vw;
height: 51px;
border-radius: 5px;
border: 1px #D4D4D4 solid;
padding: 20px;
font-size: large;
`
const EnterButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 80vw;
height: 45px;
background: rgba(163, 40, 214, 1);
color: white; 
border: none;
border-radius: 5px;
font-size: medium;
`
const SignupButton = styled.button`
margin-top: 20px;
border: none;
color: white;
background-color: transparent;
font-size: medium;
`

export default Login