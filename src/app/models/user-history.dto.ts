// user-history.dto.ts
import { RequestTxns } from './user-history-txn.dto';
export interface UserHistoryDTO {
    name: string;
    action: string;
    date: string;
    pnr : string;
    requestPassengers: number;
    remarks :string;
    id: number;
    eqRequestNo:string;
    trainNo: string;
    totalPassengers: number;
    acceptedPassengers: number;
    currentStatus: string;
    requestTxns: RequestTxns; 
    createdOn: string;
    modifiedOn :string
  }
  