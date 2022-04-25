export enum Status {
  ACTIVE,
  NOT_ACTIVE
}

export class DentalService{
  serviceId: number;
  price: number;
  description: string;
  status: Status;


  constructor(price: number, description: string) {
    this.price = price;
    this.description = description;
    this.status = Status.ACTIVE;
  }
}
