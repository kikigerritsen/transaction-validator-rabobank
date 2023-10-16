import { useState } from "react";

import DropFile from "../../components/DropFile";
import TransactionTable from "../../components/TransactionTable";
import {
  IJsonResponse,
  ITransactionObject,
} from "../../types/transaction.types";

const App = () => {
  const [jsonResponse, setJsonResponse] = useState<ITransactionObject>();

  const handleResponse = (response: IJsonResponse) => {
    setJsonResponse(undefined);
    if (response.invalidBalances.length > 0)
      setJsonResponse({
        json: response.invalidBalances,
        tableType: "invalidBalances",
      });
    else if (response.nonUniqueReferences.length > 0)
      setJsonResponse({
        json: response.nonUniqueReferences,
        tableType: "nonUniqueReferences",
      });
  };

  return (
    <div className="App">
      <DropFile getResponse={handleResponse} />
      {jsonResponse && <TransactionTable {...jsonResponse} />}
    </div>
  );
};

export default App;
