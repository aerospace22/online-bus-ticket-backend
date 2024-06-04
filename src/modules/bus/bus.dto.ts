import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Bus } from '@prisma/client';

export class BusDTO implements Partial<Bus> {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  busNo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  plateNo: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  type: string;
}
