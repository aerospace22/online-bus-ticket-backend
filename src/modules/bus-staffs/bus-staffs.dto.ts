import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BusStaff } from '@prisma/client';

export class BusStaffDTO implements Partial<BusStaff> {
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
  photo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type: string;
}
