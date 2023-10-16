import React, { useState, FormEvent } from "react";
import { GlobalStyle, InputFile, Title, Table } from "./page.styles";

interface ITransactionType {
  reference: number;
  accountNumber: string;
  description?: string;
  startBalance: number;
  mutation: number;
  mutationType: "+" | "-";
  endBalance: number;
}

interface IJsonResponse {
  nonUniqueReferences: ITransactionType[];
  invalidBalances: ITransactionType[];
}

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jsonResponse, setJsonResponse] = useState<IJsonResponse>({
    nonUniqueReferences: [],
    invalidBalances: [],
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("http://localhost:1337/api/validate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setJsonResponse(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <form
        id="uploadForm"
        encType="multipart/form-data"
        onChange={onSubmit}
        method="post"
      >
        <span id="status">{isLoading}</span>{" "}
        <InputFile>
          <div className="dropZoneContainer">
            <input
              type="file"
              id="drop_zone"
              className="upload"
              name="recordFile"
              accept=".csv,.xml"
            />
            <div className="dropZoneOverlay">
              Drag and drop your transaction file <br />
              or
              <br />
              Click to add
            </div>
          </div>
        </InputFile>
      </form>
      {jsonResponse.nonUniqueReferences.length > 0 && (
        <div>
          <Title>Non unique references</Title>
          <Table>
            <thead>
              <tr>
                <td className="invalid">Reference</td>
                <td>Account number</td>
                <td>Description</td>
                <td>Calculation</td>
                <td>End balance</td>
              </tr>
            </thead>
            <tbody>
              {jsonResponse.nonUniqueReferences.map(
                (line: ITransactionType) => {
                  return (
                    <tr
                      key={`nonUniqueReferences-${line.reference}-${line.accountNumber}`}
                    >
                      <td className="invalid">{line.reference}</td>
                      <td>{line.accountNumber}</td>
                      <td>{line.description}</td>
                      <td>
                        {line.startBalance} {line.mutationType} {line.mutation}{" "}
                        ={" "}
                      </td>
                      <td>{line.endBalance}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </div>
      )}
      {jsonResponse.invalidBalances.length > 0 && (
        <div>
          <Title>Invalid balances</Title>
          <Table>
            <thead>
              <tr>
                <td>Reference</td>
                <td>Account number</td>
                <td>Description</td>
                <td>Calculation</td>
                <td>End Balance</td>
                <td className="invalid">Actual outcome</td>
              </tr>
            </thead>
            <tbody>
              {jsonResponse.invalidBalances.map((line: ITransactionType) => {
                return (
                  <tr
                    key={`invalidBalances-${line.reference}-${line.accountNumber}`}
                  >
                    <td>{line.reference.toString()}</td>
                    <td>{line.accountNumber}</td>
                    <td>{line.description}</td>
                    <td>
                      {line.startBalance} {line.mutationType} {line.mutation}
                    </td>
                    <td>= {line.endBalance}</td>
                    {line.mutationType === "+" ? (
                      <td className="invalid">
                        {line.startBalance + line.mutation}
                      </td>
                    ) : (
                      <td className="invalid">
                        {line.startBalance - line.mutation}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default Page;
