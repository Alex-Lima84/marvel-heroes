import { MouseEvent, useEffect, useState, useRef, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from "../../services/index";
import { generateHash } from '../../services/index';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { HeroesType } from '../../types';

export default function Home() {
    const navigate = useNavigate();
    const [heroesData, setHeroesData] = useState<HeroesType>([])
    const [heroName, setHeroName] = useState<string>('')
    const [infoMessage, setInfoMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        generateHash()
    }, [])

    const findHero = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {

        if (heroName === '') {
            setErrorMessage('Please type the name of the Hero 😀')
            return
        }

        setHeroesData([])
        setInfoMessage('Loading data...')
        setErrorMessage('')
        e.preventDefault()

        const { ts, apikey, hash } = generateHash();

        try {
            const { data } = await api.get('characters', {
                params: {
                    apikey,
                    ts,
                    hash,
                    nameStartsWith: heroName
                },
            })

            if (data.data.results.length) {
                setHeroesData(data.data.results)
                setInfoMessage('')
                setErrorMessage('')
            } else {
                setErrorMessage('Hero not found 😢')
                setInfoMessage('')
                return
            }

            if (inputRef.current) {
                inputRef.current.value = ''
            }

        } catch (error) {
            console.log(error)
        }
    }

    const goToHeroDescription = (id: number) => {
        navigate(`/super-hero-description/${id}`);
    }

    const getHeroName = (e: { target: { value: SetStateAction<string>; }; }) => {
        setErrorMessage('')
        setHeroName(e.target.value)
    }

    return (
        <>
            <OutterContainer>
                <Header />
                <InnerContainer>
                    <Label>Please type the name of your favorite hero!</Label>
                    <Input ref={inputRef} onChange={(e) => getHeroName(e)}></Input>
                    <Button onClick={(e) => { findHero(e) }} >Search</Button>
                </InnerContainer>
            </OutterContainer>
            {heroesData.length ? heroesData.map((property) => (
                <HeroesContainer key={property.id}>
                    <A onClick={() => goToHeroDescription(property.id)}>
                        <Img src={`${property.thumbnail.path}.${property.thumbnail.extension}`} alt="Thumbnail" />
                        <HeroesNamesContainer>
                            <H2>{property.name}</H2>
                        </HeroesNamesContainer>
                    </A>
                </HeroesContainer>
            )) : ''}
            {infoMessage === '' ? '' : <H2>{infoMessage}</H2>}
            {errorMessage === '' ? '' : <H2>{errorMessage}</H2>}
            <Footer />
        </>
    );
}

const OutterContainer = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: flex-start;
    align-items: center; 
    font-size: 24px;
    margin-bottom: 100px;
`;

const Label = styled.label`
    font-size: 24px;
    margin-bottom: 20px; 
    color: #000;  

    @media(max-width: 650px) {
        font-size: 18px;
    }

    @media(max-width: 450px) {
        font-size: 14px;
    }
`

const Input = styled.input`
    margin-bottom: 20px;   
    padding: 5px;  
    border: none;
    outline: none;
    border-radius: 5px;
    height: 30px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const Button = styled.button`
    padding: 0 20px;
    height: 30px;
    align-self: center;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    @media(max-width: 450px) {
        height: 20px;
        font-size: 12px;
    }
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 400px;

    @media(max-width: 650px) {
        margin-top: 250px;
    
    @media(max-width: 450px) {
        margin-top: 200px;
`
const HeroesContainer = styled.div`
    margin: 40px;
`

const A = styled.a`
    display: flex;
    cursor: pointer;
`

const Img = styled.img`
    max-width: 100px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    @media(max-width: 450px) {
        max-width: 60px;
    }
`
const HeroesNamesContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
`

const H2 = styled.h2`
    font-weight: 300;
    text-align: center;

    @media(max-width: 650px) {
        font-size: 14px;

    @media(max-width: 450px) {
        font-size: 12px;        
}
`