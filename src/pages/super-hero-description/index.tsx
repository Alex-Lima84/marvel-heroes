import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services';
import { generateHash } from '../../services';
import styled from 'styled-components';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { HeroInterface } from '../../types';

export default function SuperHeroDescription() {
  const navigate = useNavigate();
  const { id } = useParams()
  const [heroeData, setHeroeData] = useState<HeroInterface>()
  const [infoMessage, setInfoMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const getHeroInfo = async () => {

    setInfoMessage('Loading data...')
    generateHash()

    const { ts, apikey, hash } = generateHash();

    try {
      const { data } = await api.get(`characters/${id}`, {
        params: {
          apikey,
          ts,
          hash
        },
      })

      if (data.data.results.length) {
        setInfoMessage('')
        setHeroeData(data.data.results[0])
      } else {
        setInfoMessage('')
        setErrorMessage('An error occurred, please reload the page.')
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHeroInfo()
  }, [])

  const goToHomePage = () => {
    navigate(`/`);
  }

  return (
    <>
      <OutterContainer>
        <Header />
      </OutterContainer>
      {errorMessage === '' ? '' : <H2>{errorMessage}</H2>}
      {infoMessage === '' ? '' : <H2>{infoMessage}</H2>}
      {heroeData ?
        <Container>
          <InnerContainer>
            <Img src={`${heroeData.thumbnail.path}.${heroeData.thumbnail.extension}`} alt="Thumbnail" />
            <H3>{heroeData.name}</H3>
            {heroeData.description === '' ? <P>Information not available.</P> : <P>{heroeData.description}</P>}
            <Button onClick={() => goToHomePage()} >Go back</Button>
          </InnerContainer>
        </Container>
        : ''}
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
  margin-bottom: 400px;

  @media(max-width: 650px) {
    margin-bottom: 250px;

  @media(max-width: 450px) {
    margin-bottom: 200px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px; 
`;

const H2 = styled.h2`
  font-weight: 300;
  text-align: center;
  font-size: 20px;
  margin-top: 40px;

  @media(max-width: 650px) {
    font-size: 14px;

  @media(max-width: 450px) {
    font-size: 12px;        
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`

const Img = styled.img`
  max-width: 400px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  @media(max-width: 650px) {    
    width: 300px;

  @media(max-width: 450px) {    
    width: 200px;
`

const H3 = styled.h3`
  @media(max-width: 650px) {
    font-size: 14px;
`

const P = styled.p`
  max-width: 500px;
  font-size: 20px;
  margin: 20px;

  @media(max-width: 650px) {    
    font-size: 14px;

  @media(max-width: 450px) {    
    font-size: 12px;
}
`

const Button = styled.button`
  padding: 0 20px;
  margin-top: 20px;
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