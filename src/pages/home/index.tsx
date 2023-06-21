import { MouseEvent, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from "../../services/index";
import { generateHash } from '../../services/index';
import Header from '../../components/header';
import Footer from '../../components/footer';


interface HeroesInterface {
    id: number;
    name: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

type HeroesType = HeroesInterface[];

export default function Home() {
    const navigate = useNavigate();
    const [heroesData, setHeroesData] = useState<HeroesType>([])
    const [heroName, setHeroName] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        generateHash()
    }, [])

    const findHero = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {

        if (heroName === '') {
            setErrorMessage('Hero not found 😢')
            return
        }

        setHeroesData([])
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

            if (!data.data.results.length) {
                setErrorMessage('Hero not found 😢')
                return
            }

            setHeroesData(data.data.results)
            setErrorMessage('')

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

    return (
        <>
            <OutterContainer>
                <Header />
                <InnerContainer>
                    <Label>Please type the name of your favorite hero!</Label>
                    <Input ref={inputRef} onChange={(e) => setHeroName(e.target.value)}></Input>
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
            {errorMessage === '' ? '' : <H2>Hero not found 😢</H2>}
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
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 400px;
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
`
const HeroesNamesContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
`

const H2 = styled.h2`
   font-weight: 300;
   text-align: center;
`