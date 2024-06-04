import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BusStaff } from '@prisma/client';

export class BusStaffDTO implements Partial<BusStaff> {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  busId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  contact: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type: string;
}
