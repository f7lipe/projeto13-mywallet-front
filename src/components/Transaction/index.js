import styled from "styled-components"

function Transaction(props){

    const {date, description, type, amount} = props

    return(
        <Row>
            <Date>{date}</Date>
            <Description>{description}</Description>
            <Amount type={type}>{amount}</Amount>
        </Row>
    )
}

const Row = styled.section` 
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

const Date = styled.p` 
color: gray;
`
const Description = styled.p`
`

const Amount = styled.p`
color: ${props => props.type === 'input' ? "green" : "red"};
`

export default Transaction