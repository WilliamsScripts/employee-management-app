import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { IEmployeeAttributes } from '../interfaces/employee.interface';

export class CreateEmployeeRequestDto implements IEmployeeAttributes {
  @IsString()
  @IsNotEmpty({ message: 'First name is mandatory' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Department is mandatory' })
  department: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Start date is mandatory' })
  startDate: Date;

  @IsString()
  @IsNotEmpty({ message: 'Job role is mandatory' })
  jobRole: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Birth day is mandatory' })
  birthday: Date;
}
