import React from 'react';
import RoutesApp from './routes';
import { createGlobalStyle } from 'styled-components';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <RoutesApp />
    </>

  );
};

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Edu SA Beginner', cursive;
  background-color: #AFAFB1;
    
  @media(max-width: 500px) {
    font-family: 'Raleway', sans-serif;;
    }
  }

  a{
  text-decoration: none;
  color: black;
}

  ul {
  list-style: none;
}

  img {
  max-width: 100%;
}
`

export default App;

