
import { Link } from "react-router-dom";
import styled from "styled-components"
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";

function SignUp() {

    const [signupData, setSignupData] = useState({email:'', name:'', image:'', password:'', photoUrl:''})
    const [loading, setLoading] = useState(false)
    //let redirectUser = useNavigate()
    
    function signup(event){
        event.preventDefault()
        setLoading(true)  
    }

    
    return (
        <Main>
             <Logo>MyWallet</Logo>
            <Form onSubmit={signup} >
                 <Label>
                    <Input type="text" name="username" placeholder="Nome" value={signupData.name} onChange={(e)=>setSignupData({...signupData, name: e.target.value})} required disabled={loading}/>
                </Label>

                <Label>
                    <Input type="e-mail" name="e-mail" placeholder="E-mail" value={signupData.email} onChange={(e)=>setSignupData({...signupData, email: e.target.value})} required disabled={loading}/>
                </Label>

                <Label>
                    <Input type="password" name="password" placeholder="Senha" value={signupData.password} onChange={(e)=>setSignupData({...signupData, password: e.target.value})} required disabled={loading}/>
                </Label>

                <Label>
                    <Input type="password" name="password" placeholder="Confirme a senha" value={signupData.password} onChange={(e)=>setSignupData({...signupData, password: e.target.value})} required disabled={loading}/>
                </Label>

                <EnterButton type="submit" value="Cadastrar" disabled={loading}>
                    {loading ? <ThreeDots color="white" height={80} width={80}/> : "Cadastrar" }
                </EnterButton>
                
            </Form>
            <Link to={"/"}>
            <SigninButton>Já tem uma conta? Faça login</SigninButton>
            </Link>
        </Main>
    )
}

const Logo = styled.div`
font-family: 'Saira Stencil One';
font-size: 32px;
font-weight: 400;
color: white;
`

const Main = styled.main`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 10vh;
`
const Form = styled.form`
margin-top: 20%;
width: 80vw;
display: flex;
flex-direction: column;

:disabled{
    background: #ccc;
}
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
align-items: center;
justify-content: center;
width: 80vw;
height: 45px;
background: rgba(163, 40, 214, 1);
color: white; 
border: none;
border-radius: 5px;
font-size: medium;
`
const SigninButton = styled.button`
margin-top: 20px;
border: none;
color: white;
background-color: transparent;
font-size: medium;
`

export default SignUp