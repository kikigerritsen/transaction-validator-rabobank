import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Montserrat", sans-serif;
    padding: 0;
    margin: 0;
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;

  thead {
    background-color: #37474f;
    color: white;
    td {
      border-color: #37474f;
      font-weight: bold;

      &.invalid {
        color: #ef5350;
      }
    }
  }

  td {
    padding: 15px;
    border: 1px solid #b0bec5;
    line-break: anywhere;
    min-width: 50px;

    &.invalid {
      color: #d50000;
    }
  }
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

export { GlobalStyle, InputFile, Title, Table };
