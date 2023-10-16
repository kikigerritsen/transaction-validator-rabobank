import {
  ITransactionObject,
  ITransactionType,
} from "../../types/transaction.types";
import { Table } from "./TransactionTable.styles";

interface ITransactionTableProps extends ITransactionObject {}

const TransactionTable = ({ json, tableType }: ITransactionTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <td className={tableType === "nonUniqueReferences" ? "invalid" : ""}>
            Reference
          </td>
          <td>Account number</td>
          <td>Description</td>
          <td>Calculation</td>
          <td className={tableType === "invalidBalances" ? "invalid" : ""}>
            End balance
          </td>
          {tableType === "invalidBalances" && (
            <td className="invalid">Actual outcome</td>
          )}
        </tr>
      </thead>
      <tbody>
        {json.map((line: ITransactionType) => {
          return (
            <tr
              key={`nonUniqueReferences-${line.reference}-${line.accountNumber}`}
            >
              <td
                className={tableType === "nonUniqueReferences" ? "invalid" : ""}
              >
                {line.reference}
              </td>
              <td>{line.accountNumber}</td>
              <td>{line.description}</td>
              <td>
                {line.startBalance} {line.mutationType} {line.mutation} ={" "}
              </td>
              <td className={tableType === "invalidBalances" ? "invalid" : ""}>
                {line.endBalance}
              </td>
              {tableType === "invalidBalances" &&
                (line.mutationType === "+" ? (
                  <td className="invalid">
                    {line.startBalance + line.mutation}
                  </td>
                ) : (
                  <td className="invalid">
                    {line.startBalance - line.mutation}
                  </td>
                ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TransactionTable;
