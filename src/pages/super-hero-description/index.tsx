import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services';
import { generateHash } from '../../services';
import styled from 'styled-components';
import Header from '../../components/header';
import Footer from '../../components/footer';

interface HeroInterface {
  id: number;
  name: string;
  description: string,
  thumbnail: {
    path: string;
    extension: string;
  };
}

export default function SuperHeroDescription() {
  const navigate = useNavigate();
  const { id } = useParams()
  const [heroeData, setHeroeData] = useState<HeroInterface>()

  const getHeroInfo = async () => {
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
      setHeroeData(data.data.results[0])

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHeroInfo()
  }, [])

  const goToHomePage = (id: any) => {
    navigate(`/`);
  }

  return (
    <>
      <Header />
      {heroeData ?
        <Container key={heroeData.id}>
          <InnerContainer>
            <Img src={`${heroeData.thumbnail.path}.${heroeData.thumbnail.extension}`} alt="Thumbnail" />
            <h3>{heroeData.name}</h3>
            {heroeData.description === '' ? <P>Information not available.</P> : <P>{heroeData.description}</P>}

            <Button onClick={() => goToHomePage(heroeData.id)} >Go back</Button>
          </InnerContainer>
        </Container>
        : ''}
      <Footer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px; 
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 400px;
`

const Img = styled.img`
  max-width: 400px;
  border-radius: 10px;
  margin-bottom: 20px;
`

const P = styled.p`
  max-width: 500px;
  font-size: 20px;
  margin: 20px;
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
`