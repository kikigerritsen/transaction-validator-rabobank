import styled, { createGlobalStyle } from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const InputFile = styled.div`
  .dropZoneOverlay,
  .upload {
    width: 100%;
    height: 130px;
  }

  .dropZoneOverlay {
    border-bottom: dotted 1px;
    border-top: dotted 1px;
    position: absolute;
    top: 0px;
    text-align: center;
    background-color: #ff9800;
    width: 100%;
    height: 97px;
    padding-top: 2rem;
  }

  .upload {
    opacity: 0;
    position: relative;
    z-index: 1;
  }
`;

const ErrorMessage = styled.div`
  color: #d83d3d;
  padding: 1rem;
  border: 1px solid;
  border-radius: 0.5rem;
  background: #ffebee;
  margin: 1rem;
`;

export { ErrorMessage, InputFile, Title };
