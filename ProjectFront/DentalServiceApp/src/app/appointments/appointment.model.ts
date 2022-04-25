import {User} from '../user/user.model';
import {DentalService} from '../dental-service/dental-service.model';

export class Appointment {
  appId: number;
  status: string;
  clientDescription: string;
  dentistDescription: string;
  appointmentDate: Date;
  dentist: User;
  patient: User;
  service: DentalService;
}
