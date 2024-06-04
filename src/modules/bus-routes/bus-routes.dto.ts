import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BusRoute, BusRouteTicket } from '@prisma/client';

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

export class BusRouteTicketDTO implements Partial<BusRouteTicket> {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  busRouteId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type: 'ordinary' | 'premium';

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  availableCount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;
}
