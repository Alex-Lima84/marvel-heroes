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
`
const A = styled.a `
    color: #DC0107;
`