import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function PageNotFound() {
  return (
    <InnerContainer className="not-found-container">
      <h1>Error 404</h1>
      <H2>Page not found 😢</H2>
      <H3>
        Please visit our
        <Link style={{fontWeight: '600'}} to="/"> Home Page</Link>
      </H3>
    </InnerContainer>
  );
}

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 60px);
`

const H2 = styled.h2`
  text-align: center;
`

const H3 = styled.h3`
  font-weight: 300; 
`