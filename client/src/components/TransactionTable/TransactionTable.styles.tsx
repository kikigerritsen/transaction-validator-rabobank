import styled from "styled-components";

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

export { Table };
