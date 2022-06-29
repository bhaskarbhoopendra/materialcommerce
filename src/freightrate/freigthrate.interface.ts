interface IFreightRate {
  zone: string;
  pincodeType: string;
  weightType: string;
  lowerbound: number;
  upperbound: number;
  rate: number;
}

export default IFreightRate;
