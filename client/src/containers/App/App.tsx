import { useState } from "react";

import DropFile from "../../components/DropFile";
import TransactionTable from "../../components/TransactionTable";
import {
  IJsonResponse,
  ITransactionObject,
} from "../../types/transaction.types";

const App = () => {
  const [jsonResponse, setJsonResponse] = useState<ITransactionObject>();

  const handleResponse = (jsonResponse: IJsonResponse) => {
    if (jsonResponse.invalidBalances.length > 0)
      setJsonResponse({
        json: jsonResponse.invalidBalances,
        tableType: "invalidBalances",
      });
    else if (jsonResponse.nonUniqueReferences.length > 0)
      setJsonResponse({
        json: jsonResponse.nonUniqueReferences,
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
