import { styled } from "styled-components"

export default function Header() {

    return (
        <P>Powered by: <A href="https://developer.marvel.com/" target="blank"> Marvel</A></P>
    )
}

const P = styled.h1`
    margin: 300px 40px 20px 20px;
    text-align: right;
    color: #000;
    font-weight: 400;  
    
    @media(max-width: 650px) {
        text-align: center;
        font-size: 20px;
    }

    @media(max-width: 450px) {
        text-align: center;
        font-size: 16px;
    }
`
const A = styled.a `
    color: #DC0107;
`