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
          <td>Reference</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        {json.map((line: ITransactionType, index: number) => {
          return (
            <tr key={`${tableType}-${line.reference}-${index}`}>
              <td>{line.reference}</td>
              <td>{line.description}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TransactionTable;
