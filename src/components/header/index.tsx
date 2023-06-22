import { styled } from "styled-components"

export default function Header() {

    return (
        <HeaderContainer>
            <H1>Welcome to the heroes stronghold</H1>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-image: url('/images/marvel-heroes.jpg'); 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 300px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;    
    position: fixed; 

    @media(max-width: 650px) {
        height: 200px;
    }
    
    @media(max-width: 450px) {
        height: 180px;
    }
`

const H1 = styled.h1`
    margin: 20px;
    font-size: 36px;
    color: #fff; 
    background-color: #000;  
    background: none;
    font-weight: 300;
    text-align: center;

    @media(max-width: 650px) {
        font-size: 24px;
    }
    
    @media(max-width: 450px) {
        font-size: 18px;
    }
`