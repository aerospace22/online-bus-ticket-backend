import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BusRoute } from '@prisma/client';

export class BusRouteDTO implements Partial<BusRoute> {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  busId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  routeFrom: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  routeTo: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  routeFromMapPin?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  routeToMapPin: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  departureTime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  departureDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  arrivalTime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  arrivalDate: string;
}
