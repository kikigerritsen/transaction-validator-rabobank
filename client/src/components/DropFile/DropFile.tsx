import { useState, FormEvent, useEffect } from "react";

import { ErrorMessage, InputFile } from "./DropFile.styles";

import { IJsonResponse } from "../../types/transaction.types";

interface IDropFileProps {
  getResponse: (jsonResponse: IJsonResponse) => void;
}

const DropFile = ({ getResponse }: IDropFileProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jsonResponse, setJsonResponse] = useState<IJsonResponse>({
    nonUniqueReferences: [],
    invalidBalances: [],
  });

  useEffect(() => {
    getResponse(jsonResponse);
  }, [jsonResponse]);

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
      setError(null);
    } catch (error: Error | any) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form
        id="uploadForm"
        encType="application/json"
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
              <br />
              Note: only .csv and .xml files are accepted
            </div>
          </div>
        </InputFile>
      </form>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};

export default DropFile;
