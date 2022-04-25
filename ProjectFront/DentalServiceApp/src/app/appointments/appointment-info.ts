export class AppointmentInfo {
  clientDescription: string;
  appointmentDate: Date;
  userId: number;
  serviceId: number;


  constructor(clientDescription: string, appointmentDate: Date, userId: number, serviceId: number) {
    this.clientDescription = clientDescription;
    this.appointmentDate = appointmentDate;
    this.userId = userId;
    this.serviceId = serviceId;
  }
}
