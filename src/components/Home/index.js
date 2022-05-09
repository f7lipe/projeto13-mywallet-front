import styled from "styled-components"
import Transaction from "../Transaction"
import {useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import configHeaders from "../../functions/configHeaders";
import TokenContext from "../../contexts/TokenContext";
import axios from "axios";



function Home() {
    const redirectUser = useNavigate()
    
    const {token} = useContext(TokenContext)
    const headers = configHeaders(token)
    const [username, setUserName] = useState("")
    const [transactions, setTransations] = useState([])

    function getUser(){
        const url = "http://127.0.0.1:5000/user"
        const promise = axios.get(url, headers)
        promise.then((response) =>{
            const {userName} = response.data
            setUserName(userName)
            getTransactions()
        })
        .catch((error)=>{
            console.log("Falha ao obter usuário.")
        })
    }

    function getTransactions(){
        const url = "http://127.0.0.1:5000/transactions"
        const promise = axios.get(url, headers)
        promise.then((response) =>{
            const transactions = response.data
            setTransations(transactions)
        })
        .catch((error)=>{
            console.log("Falha ao obter transações do usuário.")
        })
    }

    function newTransaction(type){
        redirectUser(`/new/${type}`)
    }

    function logout(){
        redirectUser(`/`)
    }

    useEffect(getUser, [])
    return (<>

        <Header>
            <p>{`Olá, ${username}`}</p>
            <svg onClick={() => logout()} width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.21053 24C0.889475 24 0.581573 23.8736 0.354555 23.6485C0.127537 23.4235 0 23.1183 0 22.8V1.2C0 0.88174 0.127537 0.576515 0.354555 0.351472C0.581573 0.126428 0.889475 0 1.21053 0H18.1579C18.4789 0 18.7868 0.126428 19.0139 0.351472C19.2409 0.576515 19.3684 0.88174 19.3684 1.2V4.8H16.9474V2.4H2.42105V21.6H16.9474V19.2H19.3684V22.8C19.3684 23.1183 19.2409 23.4235 19.0139 23.6485C18.7868 23.8736 18.4789 24 18.1579 24H1.21053ZM16.9474 16.8V13.2H8.47368V10.8H16.9474V7.2L23 12L16.9474 16.8Z" fill="white" />
            </svg>
        </Header>
        <Main>


            <WhiteBoard>
                
                {
                    transactions.map(transaction=>
                        <Transaction 
                        date={transaction.date}
                        type={transaction.type}
                        description={transaction.description}
                        amount = {transaction.amount}
                        />
                    )
                }

                <Balance>
                    <Amount_>SALDO</Amount_>
                    <Amount>222.99</Amount>
                </Balance>
            </WhiteBoard>
        </Main>

        <Footer>
        <TransactionButton onClick={()=>newTransaction("input")}>
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.9922 10.7188H12.2812V7.00781C12.2812 6.90039 12.1934 6.8125 12.0859 6.8125H10.9141C10.8066 6.8125 10.7188 6.90039 10.7188 7.00781V10.7188H7.00781C6.90039 10.7188 6.8125 10.8066 6.8125 10.9141V12.0859C6.8125 12.1934 6.90039 12.2812 7.00781 12.2812H10.7188V15.9922C10.7188 16.0996 10.8066 16.1875 10.9141 16.1875H12.0859C12.1934 16.1875 12.2812 16.0996 12.2812 15.9922V12.2812H15.9922C16.0996 12.2812 16.1875 12.1934 16.1875 12.0859V10.9141C16.1875 10.8066 16.0996 10.7188 15.9922 10.7188Z" fill="white" />
                    <path d="M11.5 0.5625C5.45996 0.5625 0.5625 5.45996 0.5625 11.5C0.5625 17.54 5.45996 22.4375 11.5 22.4375C17.54 22.4375 22.4375 17.54 22.4375 11.5C22.4375 5.45996 17.54 0.5625 11.5 0.5625ZM11.5 20.582C6.48535 20.582 2.41797 16.5146 2.41797 11.5C2.41797 6.48535 6.48535 2.41797 11.5 2.41797C16.5146 2.41797 20.582 6.48535 20.582 11.5C20.582 16.5146 16.5146 20.582 11.5 20.582Z" fill="white" />
                </svg>

                <TransactionTitle>Nova entrada</TransactionTitle>
            </TransactionButton>
            <TransactionButton onClick={()=>newTransaction("output")}>
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.9922 10.7188H7.00781C6.90039 10.7188 6.8125 10.8066 6.8125 10.9141V12.0859C6.8125 12.1934 6.90039 12.2812 7.00781 12.2812H15.9922C16.0996 12.2812 16.1875 12.1934 16.1875 12.0859V10.9141C16.1875 10.8066 16.0996 10.7188 15.9922 10.7188Z" fill="white" />
                    <path d="M11.5 0.5625C5.45996 0.5625 0.5625 5.45996 0.5625 11.5C0.5625 17.54 5.45996 22.4375 11.5 22.4375C17.54 22.4375 22.4375 17.54 22.4375 11.5C22.4375 5.45996 17.54 0.5625 11.5 0.5625ZM11.5 20.582C6.48535 20.582 2.41797 16.5146 2.41797 11.5C2.41797 6.48535 6.48535 2.41797 11.5 2.41797C16.5146 2.41797 20.582 6.48535 20.582 11.5C20.582 16.5146 16.5146 20.582 11.5 20.582Z" fill="white" />
                </svg>
                <TransactionTitle>Nova saída</TransactionTitle>

            </TransactionButton>
        </Footer>
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
margin-top: 12vh;
width: 100%;
height: 55vh;
display: flex;
justify-content: center;
align-items: center;
`

const TransactionButton = styled.div`
background: rgba(163, 40, 214, 1);
width: 155px;
height: 140px;
border-radius: 5px;
padding: 20px;
margin: 15px;
display: flex;
flex-direction: column;
justify-content:space-around;
align-items: flex-start;
`

const TransactionTitle = styled.p`
font-size: x-large;
`
const Footer = styled.footer`
display: flex;
align-items: center;
justify-content: center;
position: fixed;
bottom: 0;
left: 0;
right: 0;
height: 20vh;
`

const WhiteBoard = styled.section`
width: 80%;
height: 100%;
background-color: white;
border-radius: 10px;
overflow-y: scroll;
`

const Balance = styled.section`
display: flex;
justify-content: space-between;
align-items: center;
padding: 5px;
height: 15px;
font-size: large;
color: black;
margin: 10px;
margin-top: 40px;
`

const Amount = styled.p`
color: green;
font-weight: 900;
font-size: x-large;
`

const Amount_ = styled.p`
color: black;
font-weight: 900;
font-size: x-large;
`

export default Home