// user-history.dto.ts
import { RequestTxns } from './user-history-txn.dto';
export interface UserHistoryDTO {
    pnr : string;
    requestPassengers: number;
    remarks :string;
    id: number;
    eqRequestNo:string;
    trainNo: string;
    trainStartDate: string;
    jrnyDate: string;
    totalPassengers: number; // remove it
    acceptedPassengers: number;
    currentStatus: string;
    requestTxns: RequestTxns; 
    createdOn: string;
    modifiedOn :string;
    srcStation: string;
    destStation: string;
    mpName: string;
    assignedToAuthority: string;
  }
  