export interface Passenger {
    passengerSerialNumber: number;
    passengerName: string;
    passengerAge: number | null;
    passengerGender: string | null;
    concessionOpted: boolean;
    forGoConcessionOpted: boolean;
    passengerIcardFlag: boolean;
    childBerthFlag: boolean;
    passengerNationality: string;
    passengerQuota: string;
    passengerCoachPosition: number;
    waitListType: number;
    bookingStatusIndex: number;
    bookingStatus: string;
    bookingCoachId: string;
    bookingBerthNo: number;
    bookingStatusDetails: string;
    currentStatusIndex: number;
    currentStatus: string;
    currentCoachId: string;
    currentBerthNo: number;
    currentBerthCode: string;
    currentStatusDetails: string;
  }
  
  export interface PersonReport {
    pnrNumber: string;
    dateOfJourney: string;
    trainNumber: string;
    trainName: string;
    sourceStation: string;
    destinationStation: string;
    reservationUpto: string;
    boardingPoint: string;
    journeyClass: string;
    numberOfpassenger: number;
    chartStatus: string;
    informationMessage: string[];
    passengerList: Passenger[];
    serverId: string;
    timeStamp: string;
    trainCancelStatus: string | null;
    bookingFare: number;
    ticketFare: number;
    quota: string;
    reasonType: string;
    ticketTypeInPrs: string;
    vikalpStatus: string;
    waitListType: number;
    bookingDate: string;
    arrivalDate: string;
    mobileNumber: string | null;
    distance: number;
    divyangFlag: boolean | null;
    errorMessage: string | null;
    trainStartDate: string;
  }
  