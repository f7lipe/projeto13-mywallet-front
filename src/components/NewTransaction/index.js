import styled from "styled-components"
import { useParams, useNavigate } from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";
import { useState, useContext } from "react"
import configHeaders from "../../functions/configHeaders";
import axios from "axios";

import TokenContext from "../../contexts/TokenContext";

function NewTransaction(){

    const {type} = useParams()
    const {token} = useContext(TokenContext)
    const headers = configHeaders(token)
    const [transactionData, setTransactionData] = useState({value:'', description:''})
    const [loading, setLoading] = useState(false)
    const redirectUser = useNavigate()

    function confirmTrasaction(event){
        event.preventDefault()
        const url = 'https://projeto13-mywallet-filipe.herokuapp.com/transactions'
        setLoading(true) 
        const promise = axios.post(url,  
            {
                type: type,
                description: transactionData.description, 
                amount: transactionData.value
            }, headers
        )
        promise.then(()=>{
            setLoading(false)
            redirectUser("/home")
        })
        .catch((error) =>{
            console.log(error)
        })
        
    }

    return(
        <>
        <Header>{`Nova ${type === 'input' ? 'entrada' : 'saída'}`}</Header>
        <Main>
        <Form onSubmit={confirmTrasaction}> 
            <Label>
                <Input  type="number" pattern="\d*"  name="number" placeholder="Valor" value={transactionData.value} onChange={(e)=>setTransactionData({...transactionData, value: e.target.value})} required disabled={loading}/>
            </Label>
            <Label>

                <Input type="text" name="text" placeholder="Descrição" value={transactionData.password} onChange={(e)=>setTransactionData({...transactionData, description: e.target.value})} required disabled={loading}/>
            </Label>

            <EnterButton type="submit" value="Confirmar" disabled={loading}>
                    {loading ? <ThreeDots color="white" height={80} width={80}/> : `Salvar ${type === 'input' ? 'entrada' : 'saída'}`}
            </EnterButton>
        </Form>
    </Main>
        </>
    )
}

const Header = styled.header`
height: 10vh;
position: fixed;
display: flex;
align-items: center;
justify-content: space-between;
font-size: xx-large;
font-weight: 900;
top: 0;
left: 0;
right: 0;
padding: 20px;
`

const Main = styled.main`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 25vh;
`

const Form = styled.form`
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
const ConfirmButton = styled.button`
margin-top: 20px;
border: none;
color: white;
background-color: transparent;
font-size: medium;
`

export default NewTransaction